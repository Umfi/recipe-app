import axios from 'axios'
import { setupCache } from 'axios-cache-adapter'
import router from '../router/index.ts'
import AuthService from "@/service/AuthService";
import { get } from "./storage.js";


const cache = setupCache({
    maxAge: 2 * 60 * 1000 // 2 minutes
})

  
const $axios = axios.create({
    adapter: cache.adapter
});

$axios.interceptors.request.use(
    async config => {

        const accessToken = await get("access_token");

        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

$axios.interceptors.response.use(
    response => {
        return response;
    }, err => {
        const originalRequest = err.config;

        if (err.response.status === 401 && !originalRequest._retry) {

            if (originalRequest.url.includes("refresh") || originalRequest.url.includes("logout") || originalRequest.url.includes("login")) {
                AuthService.logout(true).then(() => {
                     router.push('/login');
                 })
             } else {      
                if (isRefreshing) {
                    return new Promise(function(resolve, reject) {
                        failedQueue.push({ resolve, reject });
                    }).then(token => {
                        originalRequest.headers['Authorization'] = 'Bearer ' + token;
                        return axios(originalRequest);
                    }).catch(err => {
                        return Promise.reject(err);
                    });
                }

                originalRequest._retry = true;
                isRefreshing = true;

                return new Promise(function(resolve, reject) {

                    AuthService.refreshToken().then(async (res) => {
                        if (res) {
                            // Perform previous request again
                            const accessToken = await get("access_token");
                            $axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
                            originalRequest.headers['Authorization'] = 'Bearer ' + accessToken;
                            processQueue(null, accessToken);
                            resolve(axios(originalRequest));
                        } else {
                            processQueue(err, null);

                            AuthService.logout().then(() => {
                                router.push('/login');
                            })
                            reject(err)
                        }

                        isRefreshing = false;
                    });
                });
            }
        }

        return Promise.reject(err);
    }
);

export default $axios;