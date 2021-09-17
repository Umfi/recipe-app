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
                <ion-item fill="outline" shape="round">
                  <ion-label position="floating">E-Mail</ion-label>
                  <ion-input></ion-input>
                </ion-item>
              </ion-col>
              <ion-col size="12">
                <ion-item fill="outline" shape="round">
                  <ion-label position="floating">Password</ion-label>
                  <ion-input></ion-input>
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
                  size="large">
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

<script lang="ts">
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
  setup() {
    return {
      close,
    };
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