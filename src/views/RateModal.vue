<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Rate recipe</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-grid>
            <ion-row>
              <ion-col>
                <ion-button fill="clear" @click="rating = 1">
                    <ion-icon v-show="rating < 1" slot="icon-only" :icon="starOutline"></ion-icon>
                    <ion-icon v-show="rating >= 1" slot="icon-only" :icon="star"></ion-icon>
                </ion-button>
              </ion-col>
              <ion-col>
                <ion-button fill="clear"  @click="rating = 2">
                    <ion-icon v-show="rating < 2" slot="icon-only" :icon="starOutline"></ion-icon>
                    <ion-icon v-show="rating >= 2" slot="icon-only" :icon="star"></ion-icon>
                </ion-button>
              </ion-col>
              <ion-col>
                <ion-button fill="clear"  @click="rating = 3">
                    <ion-icon v-show="rating < 3" slot="icon-only" :icon="starOutline"></ion-icon>
                    <ion-icon v-show="rating >= 3" slot="icon-only" :icon="star"></ion-icon>
                </ion-button>
              </ion-col>
              <ion-col>
                <ion-button fill="clear"  @click="rating = 4">
                    <ion-icon v-show="rating < 4" slot="icon-only" :icon="starOutline"></ion-icon>
                    <ion-icon v-show="rating >= 4" slot="icon-only" :icon="star"></ion-icon>
                </ion-button>
              </ion-col>
              <ion-col>
                <ion-button fill="clear" @click="rating = 5">
                    <ion-icon v-show="rating < 5" slot="icon-only" :icon="starOutline"></ion-icon>
                    <ion-icon v-show="rating >= 5" slot="icon-only" :icon="star"></ion-icon>
                </ion-button>
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
                  Save
                  </ion-button>
              </ion-col>
            </ion-row>
    </ion-grid>
  </ion-content>
</template>

<script>
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';

import { star, starOutline } from 'ionicons/icons';


export default defineComponent({
  name: 'RateModal',
  setup() {
      return {
          star, starOutline
      };
  },
  data() {
    return {
      rating: 0,
    }
  },
  components: { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonButton }
});
</script>