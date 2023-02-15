<template>
  <tabs
    :buttons="[`Kategoriyalar`, `Brendlar`, `Valyutalar`]"
    :slots="[`categories`, `brands`, `currencies`]"
  >
    <template #categories>
      <categories />
    </template>
    <template #brands>
      <brands />
    </template>
    <template #currencies>
      <currencies />
    </template>
  </tabs>
</template>

<script>
import categories from "./categories.vue";
import brands from "./brands.vue";
import currencies from "./currencies.vue";
export default {
  name: "setting",
  components: { categories, brands, currencies },
};
</script>

<style scoped></style>
