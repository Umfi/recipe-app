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
                <ion-item fill="outline" shape="round" :class="invalidName ? 'invalid' : ''">
                  <ion-label position="floating">Name</ion-label>
                  <ion-input v-model="name" inputmode="text" @ionBlur="invalidName = false"></ion-input>
                </ion-item>
              </ion-col>
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
              <ion-col size="12">
                <ion-item fill="outline" shape="round" :class="invalidPasswordConfirm ? 'invalid' : ''">
                  <ion-label position="floating">Repeat Password</ion-label>
                  <ion-input v-model="passwordConfirm" type="password" @ionBlur="invalidPasswordConfirm = false"></ion-input>
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
                  @click="register">
                  Register
                </ion-button>
              </ion-col>
            </ion-row>
            <ion-row class="ion-text-center ion-padding">
              <ion-col size="12">
                <ion-text>
                  <p class="login-text">
                    Already have an account?<br>
                    <span class="login" @click="$router.replace('/login')">Login!</span>
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

import Base from "@/components/Base.vue";

export default {
  name: "Register",
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
    return {
      close,
    };
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      invalidName: false,
      invalidEmail: false,
      invalidPassword: false,
      invalidPasswordConfirm: false
    };
  },
  methods: {
    isNameValid() {
      if (this.name == null || this.name == "" || !this.name.trim()) {
        this.showToast("Name is required");
        return false;
      }
      return true;
    },
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
    isPasswordConfirmValid() {
      if (this.passwordConfirm != this.password) {
        this.showToast("Confirm Password does not match with password");
        return false;
      }
      return true;
    },
    async register() {
      if (!this.isSending) {
        this.invalidName = false;
        this.invalidEmail = false;
        this.invalidPassword = false;
        this.invalidPasswordConfirm = false;
        
        const name = this.name;
        const email = this.email;
        const password = this.password;
        const passwordConfirmation = this.passwordConfirm;

        if (!this.isNameValid()) {
          this.invalidName = true;
          return;
        }

        if (!this.isEmailValid()) {
          this.invalidEmail = true;
          return;
        }

        if (!this.isPasswordValid()) {
          this.invalidPassword = true;
          return;
        }

        if (!this.isPasswordConfirmValid()) {
          this.invalidPasswordConfirm = true;
          return;
        }

        await this.showLoading();
        const registerSuccessful = await AuthService.register({ name, email, password, 'password_confirmation' :  passwordConfirmation });
        this.hideLoading();

        if (registerSuccessful) {
            this.showToast("Registration succesful!", "success");
            this.$router.push("/login");
            this.name = "";
            this.email = "";
            this.password = "";
            this.passwordConfirm = "";
        } else {
            this.password = "";
            this.passwordConfirm = "";
            this.showToast("Registration failed!", "danger");
        }  
      }
    },
  },
};
</script>

<style scoped>

.login-text {
  font-size: 18px;
}

.login {
  color: var(--ion-color-primary, #3880ff) !important;
  font-weight: bold;
}

</style>