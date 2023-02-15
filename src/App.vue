<template>
  <div id="main">
    <router-view />
  </div>
  <loading v-if="isloading" />
</template>

<script>
import loading from "./components/animation/loading.vue";
export default {
  name: "app",
  components: { loading },
  computed: {
    isloading() {
      return this.$store.getters.loading;
    },
  },
};
</script>

<style lang="scss">
@import url(./components/style/main.css);
</style>
