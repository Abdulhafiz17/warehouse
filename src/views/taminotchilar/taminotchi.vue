<template>
  <div class="row mb-1">
    <div class="col-12">
      <card color="green">
        <div class="row">
          <div class="col-md-4 text-start">
            <h3>Hamkor {{ market?.name }}</h3>
          </div>
          <div class="col-md-4"></div>
          <div class="col-md-4"></div>
        </div>
      </card>
    </div>
  </div>

  <tabs :buttons="[`To'lov`, `Ta'minot`]" :slots="[`payment`, `supply`]">
    <template #payment>
      <tolovTarixi />
    </template>
    <template #supply>
      <taminotTarixi />
    </template>
  </tabs>
</template>

<script>
import * as api from "../../utils/api";
import tolovTarixi from "./tolovTarixi.vue";
import taminotTarixi from "./taminotTarixi.vue";
export default {
  name: "taminotchi",
  components: { tolovTarixi, taminotTarixi },
  data() {
    return {
      market: null,
    };
  },
  created() {
    this.get();
  },
  methods: {
    get() {
      api.market(this.$route.params.id).then((val) => {
        this.market = val;
      });
    },
  },
};
</script>
