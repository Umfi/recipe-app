import { get, set, remove } from "../helper/storage.js";
import $axios from "../helper/axios.js";
import { config } from "../config.js"

class AuthService {
    async isLoggedIn() {
        const accessToken = await get('access_token')
        const user = await get('user')

        if (accessToken && user) {
            return user;
        } else {
            return false;
        }
    }

    async login(user) {
        const data = await $axios({ url: config.API_BASE_URL + 'login', data: user, method: 'POST' })
            .then(resp => {
                set("access_token", resp.data.access_token)
                set("user", resp.data.user)
                return true;
            }).catch(err => {
                console.log(err);
                remove("access_token")
                remove("user")
                return false;
            })

            return data;
    }

    async register(user) {
        const data = await $axios({url: config.API_BASE_URL + 'register', data: user, method: 'POST' })
        .then(() => {
            return true;
        }).catch(err => {
            console.log(err);
            return false;
        })

        return data;
    }

    async logout(forceLogout = false) {
        if (!forceLogout) {
            await $axios({url: config.API_BASE_URL + 'logout', method: 'POST' }).then(() => {
                remove("access_token")
                remove("user")
                delete $axios.defaults.headers.common['Authorization']
            })
        } else {
            remove("access_token")
            remove("user")
            delete $axios.defaults.headers.common['Authorization']
        }
    }

    async refreshToken() {
        const data = await $axios({url: config.API_BASE_URL + 'refresh', method: 'POST' }).then(resp => {
            const accessToken = resp.data.access_token
            set("access_token", accessToken)

            return resp.data.access_token;
        }) .catch((err) => {
            console.log(err);
            return false;
        })

        return data;
    }
}

export default new AuthService();