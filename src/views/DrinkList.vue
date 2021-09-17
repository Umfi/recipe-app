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

<script lang="ts">
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
   data() {
    return {
      all: [
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
          },
          {
            id: 5,
            name: "Demo Drink 5",
            img: "https://trinkreif.de/wp-content/uploads/tequila-sunrise-cocktail-rezept.jpg",
            liked: false,
            time: 15,
            difficulty: 'hard',
            rating: 3,
            votes: 21
          }
      ]
    };
  },
}
</script>