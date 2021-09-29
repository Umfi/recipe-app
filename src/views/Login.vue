<template>
  <ion-page>
    <ion-content fullscreen="true" slot="fixed">
      <div class="layout-card">
        <div class="layout-card-header">

          <div class="btn-header-top-right">
            <ion-button color="light" fill="outline" shape="round" class="header-btn" @click="$router.replace('/')">
              <ion-icon slot="icon-only" :icon="close" color="light"></ion-icon>
            </ion-button>
          </div>

          <div class="layout-card-avatar">
            <img src="/assets/icon/icon_transparent.png" alt="" />
          </div>
        </div>
        <div class="layout-card-body">
          <div class="user-meta ion-text-center">
            <h3 class="appname">Cheeers!</h3>
          </div>

          <ion-grid>
            <ion-row>
              <ion-col size="12">
                <ion-item fill="outline" shape="round" :class="invalidEmail ? 'invalid' : ''">
                  <ion-label position="floating">E-Mail</ion-label>
                  <ion-input v-model="email" type="email" inputmode="email" @ionBlur="invalidEmail = false"></ion-input>
                </ion-item>
              </ion-col>
              <ion-col size="12">
                <ion-item fill="outline" shape="round" :class="invalidPassword ? 'invalid' : ''">
                  <ion-label position="floating">Password</ion-label>
                  <ion-input v-model="password" type="password" @ionBlur="invalidPassword = false"></ion-input>
                </ion-item>
              </ion-col>
            </ion-row>
            <ion-row class="ion-padding-vertical">
              <ion-col size="12">
                <ion-button
                  color="primary"
                  expand="block"
                  fill="solid"
                  shape="round"
                  size="large"
                  :disabled="isSending"
                  @click="login">
                  Login
                  </ion-button>
              </ion-col>
            </ion-row>
            <ion-row class="ion-text-center ion-padding">
              <ion-col size="12">
                <ion-text>
                  <p class="register-text">
                    You do not have an account yet? <br>
                    <span class="register" @click="$router.replace('/register')">Sign up!</span>
                  </p>
                  </ion-text>
              </ion-col>
            </ion-row>
          </ion-grid>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="js">
import {
  IonContent,
  IonPage,
  IonLabel,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonItem,
  IonIcon,
  IonButton
} from "@ionic/vue";
import { close } from "ionicons/icons";

import AuthService from "@/service/AuthService";

import { useStore } from 'vuex';
import Base from "@/components/Base.vue";

export default {
  name: "Login",
  components: {
    IonContent,
    IonPage,
    IonLabel,
    IonInput,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonItem,
    IonIcon,
    IonButton
  },
  extends: Base,
  setup() {
    const store = useStore()

    return {
      store, close
    };
  },
  data() {
    return {
      email: "",
      password: "",
      invalidEmail: false,
      invalidPassword: false
    };
  },
  methods: {
    isEmailValid() {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (this.email == null || this.email == "" || !this.email.trim()) {
        this.showToast("E-Mail is required");
        return false;
      } else if (!re.test(this.email)) {
        this.showToast("E-Mail is invalid", "danger");
        return false;
      }
      return true;
    },
    isPasswordValid() {
      if (this.password == null || this.password == "" || !this.password.trim()) {
        this.showToast("Password is required");
        return false;
      } else if (this.password.length < 6) {
        this.showToast("Password is too short (Min 6 chars)", "danger");
        return false;
      }
      return true;
    },
    async login() {
      if (!this.isSending) {
        this.invalidEmail = false;
        this.invalidPassword = false;
        
        const email = this.email;
        const password = this.password;

        if (!this.isEmailValid()) {
          this.invalidEmail = true;
          return;
        }

        if (!this.isPasswordValid()) {
          this.invalidPassword = true;
          return;
        }

        await this.showLoading();
        const loginSuccessful = await AuthService.login({ email, password });
        this.hideLoading();

        if (loginSuccessful) {
            const user = loginSuccessful.user;
            this.store.commit('login', { user });
            this.showToast("Login succesful!", "success");
            this.$router.push("/");
            this.email = "";
            this.password = "";
        } else {
            this.password = "";
            this.showToast("Login failed!", "danger");
        }  
      }
    },
  },
};
</script>

<style scoped>

.register-text {
  font-size: 18px;
}

.register {
  color: var(--ion-color-primary, #3880ff) !important;
  font-weight: bold;
}

</style>