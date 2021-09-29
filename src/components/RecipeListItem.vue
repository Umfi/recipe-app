<template>
    <ion-card button="true" @click="$router.push('/recipe/' + recipe.id)" class="ion-no-margin ion-margin-bottom trending-drink-card">
        <ion-item class="ion-no-padding">
            <ion-grid class="ion-no-padding">
                <ion-row>
                    <ion-col size="5" class="ion-padding-end">
                        <ion-img :src="recipe.image" class="trending-drink-image"></ion-img>
                    </ion-col>
                    <ion-col size="6" class="ion-align-self-center">
                        <ion-row>
                            <ion-icon :icon="recipe.rating >= 1 ? star : starOutline" color="primary"></ion-icon>
                            <ion-icon :icon="recipe.rating >= 2 ? star : starOutline" color="primary"></ion-icon>
                            <ion-icon :icon="recipe.rating >= 3 ? star : starOutline" color="primary"></ion-icon>
                            <ion-icon :icon="recipe.rating >= 4 ? star : starOutline" color="primary"></ion-icon>
                            <ion-icon :icon="recipe.rating >= 5 ? star : starOutline" color="primary"></ion-icon>
                            <span class="trending-drink-votes ion-align-self-end">&nbsp; {{recipe.totalRatings}} votes</span>
                        </ion-row>
                        <ion-row class="trending-drink-title">{{recipe.name}}</ion-row>
                        <ion-row class="ion-padding-top">
                        <ion-col>
                            <ion-icon :icon="timeOutline" class="center-icon"></ion-icon> {{recipe.time}} min
                        </ion-col>
                        <ion-col>
                            <ion-icon :icon="statsChartOutline" class="center-icon"></ion-icon> {{recipe.difficulty}}
                        </ion-col>
                        </ion-row>
                    </ion-col>
                    <ion-col size="1">
                        <ion-button fill="clear" color="dark" class="ion-no-padding" @click.stop="toggleLike(recipe)">
                            <ion-icon slot="icon-only" :icon="recipe.liked ? heart : heartOutline" :color="recipe.liked ? 'primary' : 'dark'"></ion-icon>
                        </ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-item>
    </ion-card>
</template>

<script lang="ts">
import { 
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonImg,
    IonIcon,
    IonButton,
    IonCard
} from '@ionic/vue';

import {  heartOutline, heart, timeOutline, star, starOutline, statsChartOutline } from 'ionicons/icons';
import { Recipe } from '@/interfaces/Recipe';

export default {
  name: 'RecipeListItem',
  props: {
    recipe: Object
  },
  components: {
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonImg,
    IonIcon,
    IonButton,
    IonCard
  },
  setup() {
    return {
        heartOutline, heart, timeOutline, star, starOutline, statsChartOutline
    };
   },
  methods: {
    toggleLike(recipe: Recipe) {
      recipe.liked = !recipe.liked;
    },
  }
}
</script>

<style scoped>
  .trending-drink-image {
    min-height: 125px;
    min-width: 125px;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  .trending-drink-card {
    border-radius: 25px !important;
    overflow: hidden;
    width: 100%;
  }

  .trending-drink-title {
    padding-top: 5px;
    font-weight: bold;
  }

  .trending-drink-votes {
    color: darkgrey;
    font-size: 13px;
  }

  .center-icon {
     vertical-align: -2px;
  }
</style>