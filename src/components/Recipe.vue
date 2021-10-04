<script lang="js">

import Base from "@/components/Base.vue";

import RecipeService from "@/service/RecipeService";

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Recipe',
  extends: Base,
  methods: {
    toggleLike(recipe) {
      if (this.$store.state.userIsLoggedIn) {
        recipe.liked = !recipe.liked;
        
        RecipeService.toggleLike(recipe.id).then(liked => {
          if (liked != null) {
            recipe.liked = liked;
          } else {
            this.showToast("Could not like/unlike recipe. Please try again.", "danger");
          }
        }); 
      } else {
        this.showToast("You must be logged in to like a recipe.");
        this.$router.push("/login");
      }
    },
  }
});
</script>
