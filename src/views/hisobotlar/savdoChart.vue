<template>
  <div class="col-12">
    <card color="green">
      <div class="row gap-1">
        <div class="col-12 text-start">
          <h4>Savdolar</h4>
          <hr />
        </div>

        <div class="col-12">
          <div class="row">
            <div class="col-md-2">
              <div class="dropdown">
                <btn
                  id="dropdownMenuButtonMarkets"
                  type="button"
                  block="true"
                  class="dropdown-toggle"
                  data-toggle="dropdown"
                  @click="getShops()"
                >
                  {{ shop ? shop?.name : "Umumiy" }}
                </btn>
                <div
                  class="dropdown-menu w-100 mt-1"
                  aria-labelledby="dropdownMenuButtonMarkets"
                >
                  <ul
                    class="responsive-y shops-scroll"
                    style="max-height: 20vh"
                    @scroll="scrollShops()"
                  >
                    <li @click="shop = null">Umumiy</li>
                    <li
                      v-for="item in shops?.data"
                      :key="item"
                      @click="shop = item"
                    >
                      {{ item.name }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <input
                type="date"
                color="green"
                class="form-control"
                v-model="from_time"
              />
            </div>
            <div class="col-md-4">
              <input
                type="date"
                color="green"
                class="form-control"
                v-model="to_time"
              />
            </div>
            <div class="col-md-2">
              <btn block="true" @click="getProfitStatistic()">
                <i class="fa fa-search"></i>
              </btn>
            </div>
          </div>
        </div>

        <div class="col-12">
          <div id="savdo"></div>
        </div>
      </div>
    </card>
  </div>
</template>

<script>
import * as api from "../../utils/api";
export default {
  name: "savdoChart",
  data() {
    return {
      _: Intl.NumberFormat(),
      shops: null,
      shop: null,
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
      profit: {
        total_trade_prices: [
          {
            trade_price: 0,
            currency: "",
          },
        ],
        total_trade_tan_narxs: [
          {
            trade_tan_narx: 0,
            currency: "",
          },
        ],
      },
      charts: [],
    };
  },
  created() {
    this.getShops(true);
  },
  methods: {
    getShops(next) {
      api.shops("", 0, 25).then((val) => {
        this.shops = val;
        if (next) this.getProfitStatistic();
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
    getProfitStatistic() {
      let shop_id = this.shop ? this.shop.id : 0;
      api.profitStatistic(this.from_time, this.to_time, shop_id).then((val) => {
        this.profit = val;
        this.prepareChart();
      });
    },
    prepareChart() {
      this.charts = [];
      let div = document.querySelector("#savdo");
      while (div.firstChild) {
        div.firstChild.remove();
      }
      this.profit.total_trade_prices.forEach((item, index) => {
        let outer = document.createElement("div");
        let canvas = document.createElement("canvas");
        canvas.id = `savdoChart${index}`;
        outer.append(canvas);
        div.append(outer);
        let tan_narx = this.profit.total_trade_tan_narxs.find((item2) => {
          return item2.currency == item.currency;
        });
        this.charts.push({
          canvasId: canvas.id,
          data: {
            labels: ["Savdo", "Tan narx", "Daromda / Zarar"],
            datasets: [
              {
                label: item.currency,
                data: [
                  item.trade_price,
                  tan_narx.trade_tan_narx,
                  item.trade_price - tan_narx.trade_tan_narx,
                ],
                backgroundColor: [
                  "rgb(13, 110, 253)",
                  "rgb(13, 202, 240)",
                  "rgb(32, 201, 151)",
                ],
                hoverOffset: 5,
              },
            ],
          },
        });
        if (index == this.profit.total_trade_prices.length - 1) {
          this.createChart();
        }
      });
    },
    createChart() {
      this.charts.forEach((item) => {
        new Chart(document.getElementById(item.canvasId).getContext("2d"), {
          type: "pie",
          data: item.data,
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        });
      });
    },
  },
};
</script>

<style scoped>
#savdo {
  display: flex;
  justify-content: space-around;
}
</style>
