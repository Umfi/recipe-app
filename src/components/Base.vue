<script lang="js">
import { 
    toastController,
    loadingController
} from '@ionic/vue';

import { defineComponent } from 'vue';

import AuthService from "@/service/AuthService";

export default defineComponent({
  name: 'Base',
  data() {
    return {
      user: {
        name: ""
      },
      userIsLoggedIn: false,
      isSending: false
    };
  },
  methods: {
    checkSession() {
      AuthService.isLoggedIn().then(user => {
        if (user) {
          this.userIsLoggedIn = true;
          this.user = user;
        } else {
           this.userIsLoggedIn = false;
           this.user = {
              name: ""
           };
        }
      });
    },
    async showToast(text, color = '') {
      const toast = await toastController.create({
        message: text,
        color: color,
        duration: 2000,
      });
      toast.present();
    },
    async showLoading() {
      this.isSending = true;
      const loading = await loadingController
        .create({
          message: 'Please wait...',
        });
      await loading.present();
    },
    hideLoading() {
      this.isSending = false;
      loadingController.dismiss()
    },
  }
});
</script>
