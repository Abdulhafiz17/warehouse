<template>
  <div class="row gap-1 mb-1">
    <div class="col-12">
      <card color="green">
        <div class="col-md-4 text-start"><h3>Mijoz</h3></div>
        <div class="col-md-4"></div>
        <div class="col-md-4"></div>
      </card>
    </div>
  </div>

  <tabs :buttons="[`Buyurtmalar`, `To'lovlar`]" :slots="[`orders`, `payments`]">
    <template #orders>
      <buyurtmalar />
    </template>
    <template #payments>
      <tolovlar />
    </template>
  </tabs>
</template>

<script>
import tolovlar from "./tolovlar.vue";
import buyurtmalar from "./buyurtmalar.vue";
export default {
  name: "mijozTarix",
  components: { tolovlar, buyurtmalar },
};
</script>
