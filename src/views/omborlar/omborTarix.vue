<template>
  <div class="row gap-1">
    <div class="col-12">
      <card color="green">
        <div class="row">
          <div class="col-md-4 text-start">
            <h3>{{ warehouse?.name }} tarixi</h3>
          </div>
          <div class="col-md-4"></div>
          <div class="col-md-4"></div>
        </div>
      </card>
    </div>

    <div class="col-12">
      <tabs
        :buttons="[`Savdolar`, `Ta'minotlar`]"
        :slots="[`trades`, `supplies`]"
      >
        <template #trades>
          <savdolar />
        </template>
        <template #supplies>
          <taminotlar />
        </template>
      </tabs>
    </div>
  </div>
</template>

<script>
import * as api from "../../utils/api";
import savdolar from "./savdolar.vue";
import taminotlar from "./taminotlar.vue";
export default {
  name: "omborTarix",
  components: { savdolar, taminotlar },
  data() {
    return {
      warehouse: null,
    };
  },
  created() {
    this.get();
  },
  methods: {
    get() {
      api.warehouse(this.$route.params.id).then((val) => {
        this.warehouse = val;
      });
    },
  },
};
</script>
