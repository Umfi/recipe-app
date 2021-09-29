import $axios from "../helper/axios.js";
import { config } from "../config.js"

class RecipeService {
    async get(id) {
        const data = await $axios({ url: config.API_BASE_URL + 'recipe/' + id, method: 'GET' })
            .then(resp => {
                return resp.data;
            }).catch(err => {
                console.log(err);
                return null;
            })

            return data;
    }

    async getRecommended() {
        const data = await $axios({ url: config.API_BASE_URL + 'recommended-recipes', method: 'GET' })
            .then(resp => {
                return resp.data;
            }).catch(err => {
                console.log(err);
                return null;
            })

            return data;
    }

    async getTrending() {
        const data = await $axios({ url: config.API_BASE_URL + 'trending-recipes', method: 'GET' })
            .then(resp => {
                return resp.data;
            }).catch(err => {
                console.log(err);
                return null;
            })

            return data;
    }

    async getAll() {
        const data = await $axios({ url: config.API_BASE_URL + 'recipes', method: 'GET' })
            .then(resp => {
                return resp.data;
            }).catch(err => {
                console.log(err);
                return null;
            })

            return data;
    }

    async getAllFromUser() {
        const data = await $axios({ url: config.API_BASE_URL + 'created-recipes', method: 'GET' })
            .then(resp => {
                return resp.data;
            }).catch(err => {
                console.log(err);
                return null;
            })

            return data;
    }

    async getAllLikedFromUser() {
        const data = await $axios({ url: config.API_BASE_URL + 'liked-recipes', method: 'GET' })
            .then(resp => {
                return resp.data;
            }).catch(err => {
                console.log(err);
                return null;
            })

            return data;
    }
}

export default new RecipeService();