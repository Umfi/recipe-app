<script lang="js">

import Base from "@/components/Base.vue";

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Recipe',
  extends: Base,
  methods: {
    toggleLike(recipe) {
      if (this.$store.state.userIsLoggedIn) {
        recipe.liked = !recipe.liked;
      } else {
        this.showToast("You must be logged in to like a recipe.");
        this.$router.push("/login");
      }
    },
  }
});
</script>
