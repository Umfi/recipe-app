<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-item slot="start" lines="none">
          <ion-avatar style="--border-radius: 10px;">
                <img src="/assets/icon/icon.png">
          </ion-avatar>
        <ion-title color="primary">Cheeers!</ion-title>
        </ion-item>
        <ion-item slot="end" lines="none">
            <ion-avatar @click="$router.push('/profile')" v-if="userIsLoggedIn">
                <img src="https://images-eu.ssl-images-amazon.com/images/I/81LiQ6Tlr%2BL.png">
            </ion-avatar>
            <ion-avatar @click="$router.push('/login')" v-if="!userIsLoggedIn">
                <img src="/assets/images/anonym.png">
            </ion-avatar>
        </ion-item>
      </ion-toolbar>
    </ion-header>
    
    <ion-content class="ion-padding-horizontal">
      <ion-grid>
          <ion-row v-if="userIsLoggedIn">
            <h1>Welcome, <b>{{ user.name }}</b>!</h1>
          </ion-row>
          <ion-row>
              <ion-col size="9" class="ion-no-padding">
                   <ion-searchbar mode="ios" placeholder="Find your next recipe" class="ion-no-padding"></ion-searchbar>
              </ion-col>
              <ion-col size="3">
                <ion-button color="primary" shape="round">
                    <ion-icon slot="icon-only" :icon="filter"></ion-icon>
                </ion-button>
              </ion-col>
          </ion-row>
          <ion-row>
              <h2>Recommended for you</h2>
          </ion-row>
          <ion-row class="horizontal-slider">
            <recipe-card-item v-for="recipe in recommendedRecipes" :key="recipe.id" :recipe="recipe" :size="7"></recipe-card-item>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-text><h2>Trending recipes</h2></ion-text>
            </ion-col>
            <ion-col class="ion-align-self-center">
              <ion-text color="primary" class="ion-float-end" @click="$router.push('/trending')">See all</ion-text>
            </ion-col>
          </ion-row>
          <ion-row>
            <recipe-list-item v-for="recipe in trendingRecipes" :key="recipe.id" :recipe="recipe"></recipe-list-item>
          </ion-row>
       </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="js">
import { 
    IonContent, 
    IonHeader, 
    IonPage, 
    IonToolbar,
    IonGrid,
    IonRow,
    IonCol,
    IonSearchbar,
    IonItem,
    IonAvatar,
    IonTitle,
    IonIcon,
    IonButton,
    IonText
} from '@ionic/vue';

import { filter, heartOutline, heart, timeOutline, star, starOutline, statsChartOutline } from 'ionicons/icons';

import RecipeListItem from "@/components/RecipeListItem.vue";
import RecipeCardItem from "@/components/RecipeCardItem.vue";

import RecipeService from "@/service/RecipeService";
import Base from "@/components/Base.vue";

export default {
  name: 'Home',
  components: {
    IonContent, 
    IonHeader, 
    IonPage, 
    IonToolbar,
    IonGrid,
    IonRow,
    IonCol,
    IonSearchbar,
    IonItem,
    IonAvatar,
    IonTitle,
    IonIcon,
    IonButton,
    IonText,
    RecipeListItem,
    RecipeCardItem
  },
  extends: Base,
  setup() {
    return {
        filter, heartOutline, heart, timeOutline, star, starOutline, statsChartOutline
    };
  },
  data() {
    return {
      trendingRecipes: [],
      recommendedRecipes: []
    };
  },
  ionViewWillEnter() {
  
    this.checkSession();

    RecipeService.getRecommended().then(recipes => {
      this.recommendedRecipes = recipes;
    }); 

    RecipeService.getTrending().then(recipes => {
      this.trendingRecipes = recipes;
    });  
  },
}
</script>

<style scoped>
    h2 {
        font-size: 18px;    
    }
</style>