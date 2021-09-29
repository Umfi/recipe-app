<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="js">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

import AuthService from "@/service/AuthService";

export default defineComponent({
  name: 'App',
  components: {
    IonApp, 
    IonRouterOutlet
  },
  setup() {
    const store = useStore()

    AuthService.isLoggedIn().then(user => {
        if (user) {
          store.commit('login', { user });
        } else {
           store.commit('logout');
        }
      });

    return {
      store
    };
  },
});
</script>