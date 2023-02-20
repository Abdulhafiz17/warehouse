<template>
  <div class="row gap-1">
    <div class="col-12">
      <card color="green">
        <div class="row">
          <div class="col-md-4 text-start">
            <h3>Hisobotlar</h3>
          </div>
          <div class="col-md-4"></div>
          <div class="col-md-4"></div>
        </div>
      </card>
    </div>

    <savdoChart @next="next" ref="savdoChart" />

    <mahsulotChart ref="mahsulotChart" />
  </div>
</template>

<script>
import savdoChart from "./savdoChart.vue";
import mahsulotChart from "./mahsulotChart.vue";
export default {
  name: "hisobotlar",
  components: { savdoChart, mahsulotChart },
  data() {
    return {};
  },
  created() {},
  methods: {
    next() {
      this.$refs.mahsulotChart.getProductStatistic();
    },
  },
};
</script>
