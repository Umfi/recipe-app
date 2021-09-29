<template>
  <ion-page>
    <ion-content :fullscreen="true" v-if="recipe != null">
      <ion-item class="ion-no-padding ion-no-border" style="--inner-padding-end: 0;" lines="none">
        <div class="recipe-container">
            <ion-img :src="recipe.image" class="recipe-image"></ion-img>
            <div class="recipe-content">
                <div class="top-left">
                    <ion-button color="primary" shape="round" class="recipe-header-btn" @click="$router.go(-1)">
                        <ion-icon slot="icon-only" :icon="arrowBack" color="light"></ion-icon>
                    </ion-button>
                </div>
                <div class="top-right">
                    <ion-button fill="clear" color="light" class="recipe-header-btn" @click="toggleLike(recipe)">
                        <ion-icon slot="icon-only" :icon="recipe.liked ? heart : heartOutline" :color="recipe.liked ? 'primary' : 'light'"></ion-icon>
                    </ion-button>
                </div>

                <div class="recipe-rating" @click="showRateModal">
                    <ion-icon :icon="recipe.rating >= 1 ? star : starOutline" color="primary"></ion-icon>
                    <ion-icon :icon="recipe.rating >= 2 ? star : starOutline" color="primary"></ion-icon>
                    <ion-icon :icon="recipe.rating >= 3 ? star : starOutline" color="primary"></ion-icon>
                    <ion-icon :icon="recipe.rating >= 4 ? star : starOutline" color="primary"></ion-icon>
                    <ion-icon :icon="recipe.rating >= 5 ? star : starOutline" color="primary"></ion-icon>
                </div>

                <div class="recipe-title">
                    <h1>{{recipe.name}}</h1>
                </div>
            </div>
        </div>
      </ion-item>
      <ion-item lines="none" class="short-info-tiles-container">
        <ion-chip outline>
          <ion-icon :icon="timeOutline"></ion-icon> 
          <ion-label>{{ recipe.time }} min</ion-label>
          </ion-chip> 
        <ion-chip outline>
          <ion-icon :icon="statsChartOutline"></ion-icon> 
          <ion-label>{{ recipe.difficulty }}</ion-label>
        </ion-chip>
        <ion-chip outline>
          <ion-icon :icon="personOutline"></ion-icon> 
          <ion-label>{{ recipe.amount }}</ion-label>
        </ion-chip>
        <ion-chip outline>
          <ion-icon :icon="flameOutline"></ion-icon> 
          <ion-label>{{ recipe.calories }} kcal</ion-label>
        </ion-chip>
      </ion-item>
      <ion-list>
        <ion-list-header><h3>Ingredients</h3></ion-list-header>
        <ion-item v-for="ingredient in recipe.ingredients" :key="ingredient.id">
          <ion-col size="3">{{ ingredient.amount + ' ' + ingredient.unit}}</ion-col>
          <ion-col>{{ ingredient.name }}</ion-col>
        </ion-item>
      </ion-list>
      <ion-list>
        <ion-list-header><h3>Instructions</h3></ion-list-header>
          <ion-item v-for="(instruction, index)  in recipe.instructions" :key="instruction.id">
            <ion-col size="1"><b>{{ index + 1 }}</b></ion-col>
            <ion-col>{{ instruction.instruction }}</ion-col>
          </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="js">
import { IonContent, IonPage, IonImg, IonIcon, IonButton, IonItem, IonLabel, IonChip, IonListHeader, IonList, IonCol, modalController } from '@ionic/vue';
import { arrowBack, heartOutline, heart, timeOutline, star, starOutline, statsChartOutline, personOutline, flameOutline } from 'ionicons/icons';

import Base from "@/components/Base.vue";

import { useRoute } from 'vue-router';

import RateModal from './RateModal.vue';

import RecipeService from "@/service/RecipeService";


export default {
  name: 'Detail',
  components: {
    IonContent, IonPage, IonImg, IonIcon, IonButton, IonItem, IonLabel, IonChip, IonListHeader, IonList, IonCol
  },
  extends: Base,
  setup() {
    const route = useRoute();
    const { id } = route.params;

    return {
        id, arrowBack, heartOutline, heart, timeOutline, star, starOutline, statsChartOutline, personOutline, flameOutline
    };
  },
  ionViewWillEnter() {
    RecipeService.get(this.id).then(recipe => {
      if (recipe != null) {
        this.recipe = recipe;
      }
    }); 
  },
  data() {
    return {
      recipe: null
    };
  },
  methods: {
     async showRateModal() {
      const modal = await modalController
        .create({
          component: RateModal,
          initialBreakpoint: 0.4,
          breakpoints: [0, 0.4]
        })
      return modal.present();
    },
    toggleLike(recipe) {
      recipe.liked = !recipe.liked;
    },
  }
}
</script>

<style scoped>
 .recipe-image {
    height: 100%;
    width: 100%;
    object-fit: cover;
 }

 .recipe-container {
    position: relative;
    text-align: center;
    color: white;
    max-height: 350px;
  }

  .recipe-content {
    position: absolute;
    bottom: 0; 
    background: linear-gradient(to top, rgba(0, 0, 0, 0.55), transparent);
    color: #f1f1f1;
    width: 100%; 
    height: 100%;
    border-radius: 25px !important;
    overflow: hidden;
  }

  .top-right {
    position: absolute;
    top: 20px;
    right: 16px;
    color: white;
    z-index: 11;
  }

  .top-left {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 11;
  }

  .recipe-title {
    position: absolute;
    bottom: 5px;
    left: 20px;
    color: white;
  }

  .recipe-rating {
    position: absolute;
    bottom: 45px;
    left: 20px;
    color: white;
    z-index: 11;
  }


  .recipe-header-btn {
    --padding-top: 0;
    --padding-start: 10px;
    --padding-end: 10px;
    --padding-bottom: 0;
    height: 2.0em;
    font-size: 22px;
  }

  .short-info-tiles-container {
    padding-top: 15px;
    margin-bottom: -10px;
  }
</style>