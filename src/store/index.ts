import { createStore } from 'vuex'

export const store = createStore({
  state () {
    return {
        userIsLoggedIn: false,
        user: {
          name: ""
        }
    }
  },
  mutations: {
    login (state: any,  { user }) {
      state.userIsLoggedIn = true;
      state.user = user;
    },
    logout (state: any) {
      state.userIsLoggedIn = false;
      state.user = {
        name: ""
      };
    }
  }
})