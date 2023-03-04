<template>
  <div class="row gap-1 mb-1">
    <div class="col-12">
      <card color="green">
        <div class="row">
          <div class="col-md-4 text-start">
            <h3>{{ market?.name }}dan ta'minot olish</h3>
          </div>
          <div class="col-md-4"></div>
          <div class="col-md-4"></div>
        </div>
      </card>
    </div>
    <div class="col-12">
      <card color="green">
        <Products ref="products" />
      </card>
    </div>
  </div>
</template>

<script>
import * as api from "../../utils/api";
import Products from "./Ta'minotMahsulotlari.vue";
import Expenses from "./Ta'minotChiqimlari.vue";
export default {
  name: "taminot",
  components: { Products, Expenses },
  data() {
    return {
      _: Intl.NumberFormat(),
      market: null,
    };
  },
  created() {
    this.getMarket();
  },
  methods: {
    getMarket() {
      api.market(this.$route.params.id).then((val) => {
        this.market = val;
      });
    },
  },
};
</script>
