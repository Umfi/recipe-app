<script lang="ts">
import { 
    toastController,
    loadingController
} from '@ionic/vue';

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Base',
  data() {
    return {
      isSending: false
    };
  },
  methods: {
    async showToast(text: string, color = '') {
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
