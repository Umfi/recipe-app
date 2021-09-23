import { get, set, remove } from "../helper/storage.js";
import $axios from "../helper/axios.js";
import { config } from "../config.js"


export async function isLoggedIn() {
    const accessToken = await get('access_token')
    if (accessToken) {
        return true;
    } else {
        return false;
    }
}

export async function login(user) {
    const data = await $axios({ url: config.API_BASE_URL + 'login', data: user, method: 'POST' })
        .then(resp => {
            const accessToken = resp.data.access_token
            set("access_token", accessToken)
            return true;
        })
        .catch(err => {
            console.log(err);
            remove("access_token")
            return false;
        })

        return data;
}

export async function register(user) {
    const data = await $axios({url: config.API_BASE_URL + 'register', data: user, method: 'POST' })
    .then(() => {
        return true;
    })
    .catch(err => {
      console.log(err);
      return false;
    })

    return data;
}

export async function logout(forceLogout = false) {
    if (!forceLogout) {
        await $axios({url: config.API_BASE_URL + 'logout', method: 'POST' }).then(() => {
            remove("access_token")
            delete $axios.defaults.headers.common['Authorization']
        })
    } else {
        remove("access_token")
        delete $axios.defaults.headers.common['Authorization']
    }
}

export async function refreshToken() {
    const data = await $axios({url: config.API_BASE_URL + 'refresh', method: 'POST' })
    .then(resp => {
      const accessToken = resp.data.access_token
      set("access_token", accessToken)

      return resp.data.access_token;
    })
    .catch((err) => {
      console.log(err);
      return false;
    })

    return data;
}