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
            <h3 class="usernmae">{{ user.name }}</h3>
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
            <recipe-card-item v-for="recipe in likedRecipes" :key="recipe.id" :recipe="recipe" :size="5"></recipe-card-item>
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
            <recipe-card-item v-for="recipe in createdRecipes" :key="recipe.id" :recipe="recipe" :size="5"></recipe-card-item>
          </ion-row>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="js">
import { IonContent,  IonPage, IonIcon, IonLabel, IonButton, IonText, IonCol, IonRow, IonPopover, IonList, IonItem, modalController, popoverController } from '@ionic/vue';
import { arrowBack, logOut, settings, mail, lockClosed } from 'ionicons/icons';

import { computed } from 'vue';
import { useStore } from 'vuex';

import RecipeCardItem from "@/components/RecipeCardItem.vue";
import Base from "@/components/Base.vue";

import ChangeEmailModal from "./ChangeEmailModal.vue"
import ChangePasswordModal from './ChangePasswordModal.vue';
import AuthService from "@/service/AuthService";
import RecipeService from "@/service/RecipeService";

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
  extends: Base,
  setup() {
    const store = useStore()

    return {
      loggedIn: computed(() => store.state.userIsLoggedIn),
      user: computed(() => store.state.user),
      store, arrowBack, logOut, settings, mail, lockClosed
    };
  },
  data() {
    return {
      createdRecipes: [],
      likedRecipes: []
    };
  },
  ionViewWillEnter() {
    RecipeService.getAllFromUser().then(recipes => {
      this.createdRecipes = recipes;
    }); 
    
    RecipeService.getAllLikedFromUser().then(recipes => {
      this.likedRecipes = recipes;
    });  
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

      AuthService.logout().then(() => {
          this.store.commit('logout');
          this.$router.replace("/");
        }).catch((err) => {
          console.log(err);
          AuthService.logout(true).then(() => {
            this.store.commit('logout');
            this.$router.replace("/");
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