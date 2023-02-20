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

    <savdoChart />

    <mahsulotChart />
  </div>
</template>

<script>
import * as api from "../../utils/api";
import savdoChart from "./savdoChart.vue";
import mahsulotChart from "./mahsulotChart.vue";
export default {
  name: "hisobotlar",
  components: { savdoChart, mahsulotChart },
  data() {
    return {
      _: Intl.NumberFormat(),
      shops: null,
      from_time: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        .toISOString()
        .substring(0, 10),
      to_time: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 1
      )
        .toISOString()
        .substring(0, 10),
      shop: null,
      profit: null,
      from_time1: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        .toISOString()
        .substring(0, 10),
      to_time1: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 1
      )
        .toISOString()
        .substring(0, 10),
      limit: null,
      products: [],
    };
  },
  created() {
    // this.getShops();
  },
  methods: {
    getShops() {
      api.shops("", 0, 25).then((val) => {
        this.shops = val;
        this.getProfitStatistic(true);
      });
    },
    scrollShops() {
      let div = document.querySelector(".shops-scroll");
      if (div.scrollTop + div.clientHeight >= div.scrollHeight) {
        if (this.shops.current_page < this.shops.pages - 1) {
          api.shops("", this.shops.current_page + 1, 25).then((Response) => {
            this.shops.current_page = Response.current_page;
            this.shops.data = this.shops.data.concat(Response.data);
          });
        }
      }
    },
    getProfitStatistic(next) {
      let shop_id = this.shop ? this.shop.id : 0;
      api.profitStatistic(this.from_time, this.to_time, shop_id).then((val) => {
        this.profit = val;
        this.getProductStatistic();
      });
    },
    findProfit(item) {
      let tan_narx = this.profit?.total_trade_tan_narxs.find((price) => {
        return price.currency == item.currency;
      });

      return item.trade_price - tan_narx?.trade_tan_narx;
    },
    getProductStatistic() {
      api.productStatistic(this.from_time1, this.to_time1, 10).then((val) => {
        this.products = val;
      });
    },
  },
};
</script>
