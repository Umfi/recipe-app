<template>
    <ion-col :size="size">
        <div class="ion-activatable recommended-drink-container" @click="$router.push('/recipe/' + recipe.id)">
            <ion-img :src="recipe.img" class="recommended-drink-image"></ion-img>
            <div class="recommended-drink-content">
                <div class="top-right">
                    <ion-button fill="clear" color="light" class="ion-no-padding" @click.stop="toggleLike(recipe)">
                        <ion-icon slot="icon-only" :icon="recipe.liked ? heart : heartOutline" :color="recipe.liked ? 'primary' : 'light'"></ion-icon>
                    </ion-button>
                </div>
                <div class="centered">
                    {{recipe.name}}
                </div>
            </div>
        </div>
    </ion-col>
</template>

<script lang="ts">
import { 
    IonCol,
    IonImg,
    IonIcon,
    IonButton
} from '@ionic/vue';

import {  heartOutline, heart } from 'ionicons/icons';
import { Recipe } from '@/interfaces/Recipe';


export default {
  name: 'RecipeCardItem',
  props: {
    recipe: Object,
    size: Number
  },
  components: {
    IonCol,
    IonImg,
    IonIcon,
    IonButton
  },
  setup() {
       return {
           heartOutline, heart
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

    .profile-wrapper .recommended-drink-container {
        height: 175px !important;
    }

    .recommended-drink-container {
        position: relative;
        text-align: center;
        color: white;
        height: 225px;
    }

    .profile-wrapper .top-right {
        display: none;
    }

    .top-right {
        position: absolute;
        top: 8px;
        right: 16px;
        color: white;
        z-index: 11;
    }

    .centered {
        position: absolute;
        bottom: 0px;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        color: white;
        font-weight: bold;
    }

    .recommended-drink-image {
        height: 100%;
        width: 100%;
        object-fit: cover;

        border-radius: 25px !important;
        overflow: hidden;
    }

    .recommended-drink-content {
        position: absolute; 
        bottom: 0; 
        background: linear-gradient(to top, rgba(0, 0, 0, 0.55), transparent);
        color: #f1f1f1; 
        width: 100%; 
        height: 100%; 
        border-radius: 25px !important;
        overflow: hidden;
    }
</style>