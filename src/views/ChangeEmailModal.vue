<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Change E-Mail</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-grid>
            <ion-row>
              <ion-col size="12">
                <ion-item fill="outline" shape="round">
                  <ion-label position="floating">New E-Mail</ion-label>
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
                  Update
                  </ion-button>
              </ion-col>
            </ion-row>
    </ion-grid>
  </ion-content>
</template>

<script>
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonGrid, IonRow, IonCol, IonButton, IonLabel, IonInput } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ChangeEmailModal',
  data() {
    return {
      content: 'Content',
    }
  },
  components: { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonGrid, IonRow, IonCol, IonButton, IonLabel, IonInput }
});
</script>