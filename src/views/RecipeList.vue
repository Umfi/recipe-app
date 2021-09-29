<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title v-if="mode == 'trending'">Trending Recipes</ion-title>
        <ion-title v-if="mode == 'liked'">My Liked Recipes</ion-title>
        <ion-title v-if="mode == 'my'">My Recipes</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title v-if="mode == 'trending'">Trending Recipes</ion-title>
          <ion-title v-if="mode == 'liked'">My Liked Recipes</ion-title>
          <ion-title v-if="mode == 'my'">My Recipes</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-grid class="ion-padding-top">
        <ion-row>
          <recipe-list-item v-for="recipe in all" :key="recipe.id" :recipe="recipe"></recipe-list-item>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="js">
import { 
    IonButtons, 
    IonContent, 
    IonHeader, 
    IonBackButton, 
    IonPage, 
    IonToolbar,
    IonGrid,
    IonRow,
    IonTitle,
} from '@ionic/vue';

import { filter, heartOutline, heart, timeOutline, star, starOutline, statsChartOutline } from 'ionicons/icons';

import RecipeListItem from "@/components/RecipeListItem.vue";

import RecipeService from "@/service/RecipeService";

export default {
  name: 'DrinkList',
  props: {
    mode: String
  },
  components: {
    IonButtons, 
    IonContent, 
    IonHeader, 
    IonBackButton, 
    IonPage, 
    IonToolbar,
    IonGrid,
    IonRow,
    IonTitle,
    RecipeListItem
  },
  setup() {
       return {
           filter, heartOutline, heart, timeOutline, star, starOutline, statsChartOutline
       };
   },
   async mounted() {
     let recipes = [];
     if (this.mode === 'my') {
      recipes = await RecipeService.getAllFromUser();
     } else if (this.mode === 'liked') {
      recipes = await RecipeService.getAllLikedFromUser();
     } else {
      recipes = await RecipeService.getAll();
     }

     if (recipes != null) {
        this.all = recipes;
     }
  },
   data() {
    return {
      all: []
    };
  },
}
</script>