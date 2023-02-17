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

    <div class="col-12">
      <card color="green">
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
                {{ shop ? shop?.name : "Mijoz" }}
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
      </card>
    </div>

    <div class="col-12">
      <card color="green">
        <div class="row">
          <div class="col-12 text-start">
            <h4>Savdo</h4>
            <hr />
          </div>
          <div class="col-md-4">
            <strong>Umumiy savdo</strong>
            <ul>
              <li v-for="item in profit?.total_trade_prices" :key="item">
                {{ _.format(item.trade_price) + " " + item.currency }}
              </li>
            </ul>
          </div>
          <div class="col-md-4">
            <strong>Umumiy tan narx</strong>
            <ul>
              <li v-for="item in profit?.total_trade_tan_narxs" :key="item">
                {{ _.format(item.trade_tan_narx) + " " + item.currency }}
              </li>
            </ul>
          </div>
          <div class="col-md-4">
            <strong>Foyda</strong>
            <ul>
              <li v-for="item in profit?.total_trade_prices" :key="item">
                {{ _.format(findProfit(item)) + " " + item.currency }}
              </li>
            </ul>
          </div>
        </div>
      </card>
    </div>

    <div class="col-12">
      <card color="green">
        <div class="row">
          <div class="col-md-5">
            <input
              type="date"
              color="green"
              class="form-control"
              v-model="from_time"
            />
          </div>
          <div class="col-md-5">
            <input
              type="date"
              color="green"
              class="form-control"
              v-model="to_time"
            />
          </div>
          <div class="col-md-2">
            <btn block="true" @click="getProductStatistic()">
              <i class="fa fa-search"></i>
            </btn>
          </div>
        </div>
      </card>
    </div>

    <div class="col-12">
      <card color="green">
        <div class="row">
          <div class="col-12 text-start">
            <h4>Mahsulotlar</h4>
            <hr />
          </div>
          <div class="col-md-4 mb-1" v-for="item in products" :key="item">
            <card color="green" class="h-100">
              {{
                item.Trades.warehouse_product.brand.category.name +
                " " +
                item.Trades.warehouse_product.brand.name +
                " " +
                item.Trades.warehouse_product.name
              }}
              <hr />
              {{ item.sum_quantity + " dona" }}
            </card>
          </div>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import * as api from "../../utils/api";
export default {
  name: "hisobotlar",
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
    this.getShops();
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

      return item.trade_price - tan_narx.trade_tan_narx;
    },
    getProductStatistic() {
      api.productStatistic(this.from_time1, this.to_time1, 10).then((val) => {
        this.products = val;
      });
    },
  },
};
</script>
