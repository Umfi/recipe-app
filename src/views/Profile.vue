<template>
  <ion-page>
    <ion-content fullscreen="true" slot="fixed" >
      <div class="layout-card">
        <div class="layout-card-header">
            <div class="btn-header-top-left">
              <ion-button color="light" fill="outline" shape="round" class="header-btn" @click="$router.go(-1)">
                  <ion-icon slot="icon-only" :icon="arrowBack" color="light"></ion-icon>
              </ion-button>
            </div>
            <div class="btn-header-top-right">
              <ion-button id="trigger-button" color="light" fill="outline" shape="round" class="header-btn">
                <ion-icon slot="icon-only" :icon="settings" color="light"></ion-icon>
              </ion-button>
              <ion-popover trigger="trigger-button" trigger-action="click">
                <ion-content>
                  <ion-list>
                    <ion-item @click="showChangeEmailModal()">
                      <ion-icon :icon="mail" class="ion-padding-end"></ion-icon>
                      <ion-label>Change E-Mail</ion-label>
                    </ion-item>
                      <ion-item @click="showChangePasswordModal()">
                      <ion-icon :icon="lockClosed" class="ion-padding-end"></ion-icon>
                      <ion-label>Change Password</ion-label>
                    </ion-item>
                    <ion-item lines="none" @click="logoutUser()">
                      <ion-icon :icon="logOut" class="ion-padding-end"></ion-icon>
                      <ion-label>Logout</ion-label>
                    </ion-item>
                  </ion-list>
                </ion-content>
              </ion-popover>
          </div>
          <div class="layout-card-avatar">
            <img src="https://images-eu.ssl-images-amazon.com/images/I/81LiQ6Tlr%2BL.png" alt="">
          </div>
        </div>
        <div class="layout-card-body">
          <div class="user-meta ion-text-center">
            <h3 class="usernmae">Olivia </h3>
            <h5 class="rank">Newbie</h5>
          </div>

          <ion-row>
              <ion-col>
                <ion-text><h6>My Liked Recipes</h6></ion-text>
              </ion-col>
              <ion-col class="ion-align-self-center">
                <ion-text color="primary" class="ion-float-end" @click="$router.push('/likedrecipes')">See all</ion-text>
              </ion-col>
          </ion-row>
          <ion-row class="horizontal-slider profile-wrapper">
            <recipe-card-item v-for="recipe in recommended" :key="recipe.id" :recipe="recipe" :size="5"></recipe-card-item>
          </ion-row>

          <ion-row>
            <ion-col>
              <ion-text><h6>My Recipes</h6></ion-text>
            </ion-col>
            <ion-col class="ion-align-self-center">
              <ion-text color="primary" class="ion-float-end" @click="$router.push('/myrecipes')">See all</ion-text>
            </ion-col>
          </ion-row>
          <ion-row class="horizontal-slider profile-wrapper">
            <recipe-card-item v-for="recipe in recommended" :key="recipe.id" :recipe="recipe" :size="5"></recipe-card-item>
          </ion-row>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="js">
import { IonContent,  IonPage, IonIcon, IonLabel, IonButton, IonText, IonCol, IonRow, IonPopover, IonList, IonItem, modalController, popoverController } from '@ionic/vue';
import { arrowBack, logOut, settings, mail, lockClosed } from 'ionicons/icons';
import RecipeCardItem from "@/components/RecipeCardItem.vue";

import ChangeEmailModal from "./ChangeEmailModal.vue"
import ChangePasswordModal from './ChangePasswordModal.vue';
import { logout } from "@/service/AuthService.js";

export default {
  name: 'Profile',
  components: {
    IonContent,
    IonPage,
    IonIcon, 
    IonButton, 
    IonText, 
    IonCol, 
    IonRow, 
    IonLabel, 
    IonPopover, 
    IonList, 
    IonItem,
    RecipeCardItem
  },
  setup() {
       return {
           arrowBack, logOut, settings, mail, lockClosed
       };
  },
  data() {
    return {
      recommended: [
          {
            id: 1,
            name: "Demo Drink 1",
            img: "https://cocktailbart.de/wp-content/uploads/2017/06/Sex-on-the-beach-cocktail-2.jpg",
            liked: true,
            time: 5,
            difficulty: 'easy',
            rating: 3,
            votes: 12
          },
          {
            id: 2,
            name: "Demo Drink 2",
            img: "https://cocktailbart.de/wp-content/uploads/2021/05/Blue-Hawaii-Cocktail-2.jpg",
            liked: false,
            time: 10,
            difficulty: 'easy',
            rating: 4,
            votes: 11
          },
          {
            id: 3,
            name: "Demo Drink 3",
            img: "https://trinkreif.de/wp-content/uploads/tequila-sunrise-cocktail-rezept.jpg",
            liked: false,
            time: 20,
            difficulty: 'hard',
            rating: 5,
            votes: 32
          },
          {
            id: 4,
            name: "Demo Drink 4",
            img: "https://www.gourmet-magazin.de/fileadmin/user_upload/rezepte/drinks/cocktails/pink-lady-7.jpg",
            liked: true,
            time: 15,
            difficulty: 'medium',
            rating: 0,
            votes: 2
          }
      ]
    };
  },
  methods: {
    async showChangeEmailModal() {
      popoverController.dismiss();
      const modal = await modalController
        .create({
          component: ChangeEmailModal,
          initialBreakpoint: 0.4,
          breakpoints: [0, 0.4, 1]
        })
      return modal.present();
    },
    async showChangePasswordModal() {
      popoverController.dismiss();
      const modal = await modalController
        .create({
          component: ChangePasswordModal,
          initialBreakpoint: 0.6,
          breakpoints: [0, 0.6, 1]
        })
      return modal.present();
    },
    logoutUser() {
      popoverController.dismiss();

      logout().then(() => {
          this.$router.push("/");
        }).catch((err) => {
          console.log(err);
          logout(true).then(() => {
            this.$router.push("/");
          })
        });
    }
  },
}
</script>

<style scoped>

ion-content ion-button {
	margin-top: 1em;
	margin-bottom: 1em;
}

.layout-card-body .user-meta {
  padding-top: 20px;
}

.layout-card-body .user-meta .usernmae {
	font-size: 24px;
	font-weight: 600;
	color: #303940;
}

.layout-card-body .user-meta .rank {
	font-size: 90%;
	color: #949ea6;
	text-transform: uppercase;
	margin: 0 auto;
}

</style>