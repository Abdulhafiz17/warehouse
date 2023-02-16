<template>
  <div class="row gap-1 mb-1">
    <div class="col-12">
      <card color="green">
        <div class="row">
          <div class="col-4 text-start">
            <h3>Mijoz bilan savdo</h3>
          </div>
          <div class="col-4">
            <btn block="true" @click="addOrder()" v-if="!order">
              Buyurtma ochish
            </btn>
            <div class="btn-group" v-else-if="order">
              <btn block="true" color="green" @click="confirmOrder()">
                Tasdiqlash
              </btn>
              <btn block="true" color="red" @click="deleteOrder()">
                Yakunlash
              </btn>
            </div>
          </div>
          <div class="col-4">
            <select
              class="form-select"
              color="green"
              v-model="warehouse_id"
              @change="getProducts(0, 25)"
              v-if="order"
            >
              <option v-for="item in warehouses" :key="item" :value="item.id">
                {{ item.name }}
              </option>
            </select>
          </div>
        </div>
      </card>
    </div>

    <!-- <div class="col-12">
      <card color="green"></card>
    </div> -->
  </div>

  <div class="row" v-if="order">
    <div class="col-md-6">
      <card color="green">
        <div class="row gap-1 mb-1">
          <div class="col-12">
            <input
              type="search"
              color="green"
              class="form-control"
              placeholder="qidiruv"
              v-model="search"
              @keyup="getProducts(0, 25)"
            />
          </div>
          <div class="col-12 responsive-y" style="max-height: 70vh">
            <ul>
              <li v-for="item in products?.data" :key="item">
                <span>
                  {{
                    item.Warehouse_products.brand.category.name +
                    " " +
                    item.Warehouse_products.brand.name +
                    " " +
                    item.Warehouse_products.name +
                    " "
                  }}
                  <strong>{{
                    item.Warehouse_products.quantity + " dona"
                  }}</strong>
                </span>
                <span>
                  <span class="px-2">{{
                    _.format(item.Warehouse_products?.trade_price) +
                    " " +
                    item.trade_currency
                  }}</span>
                  <btn
                    color="cyan"
                    data-toggle="modal"
                    data-target="#add-trade"
                    @click="
                      product = item;
                      trade.price = item.Warehouse_products.trade_price;
                      trade.currency_id =
                        item.Warehouse_products.trade_currency_id;
                      getCurrencies();
                    "
                  >
                    <i class="fa fa-share"></i>
                  </btn>
                </span>
              </li>
            </ul>
          </div>
          <div class="col-12">
            <pagination
              :page="products?.current_page"
              :pages="products?.pages"
              :limit="products?.limit"
              @get="getProducts"
            />
          </div>
        </div>
      </card>
    </div>
    <div class="col-md-6">
      <card color="green">
        <div class="row gap-1">
          <div class="col-12 responsive-y" style="max-height: 76vh">
            <ul>
              <li v-for="item in trades?.data" :key="item">
                <span>
                  {{
                    item.Trades.warehouse_product.brand.category.name +
                    " " +
                    item.Trades.warehouse_product.brand.name +
                    " " +
                    item.Trades.warehouse_product.name +
                    " "
                  }}
                  <strong>{{ item.Trades.quantity + " dona" }}</strong>
                </span>
                <span>
                  <span class="px-2">{{
                    _.format(item.Trades.price) +
                    " " +
                    item.Trades.currency.currency
                  }}</span>
                  <btn color="red" @click="deleteTrade(item.Trades.id)">
                    <i class="fa fa-trash"></i>
                  </btn>
                </span>
              </li>
            </ul>
          </div>
          <div class="col-23">
            <pagination
              :page="trades?.current_page"
              :pages="trades?.pages"
              :limit="trades?.limit"
              @get="getTrades"
            />
          </div>
        </div>
      </card>
    </div>
  </div>

  <modal id="add-trade">
    <template #header>
      <h5>
        {{ product?.Warehouse_products?.brand?.category?.name }}
        {{ product?.Warehouse_products?.brand?.name }}
        {{ product?.Warehouse_products?.name }}
        <strong>{{ product?.Warehouse_products?.quantity + " dona" }}</strong>
      </h5>
      <h5>
        {{
          _.format(product?.Warehouse_products?.trade_price) +
          " " +
          product?.trade_currency
        }}
      </h5>
    </template>
    <template #body>
      <form id="trade-form" @submit.prevent="addTrade()">
        <div class="row gap-1">
          <div class="col-12">
            <div class="input-group" v-if="product">
              <input
                type="number"
                min="0"
                step="any"
                color="green"
                class="form-control"
                required
                v-model="trade.price"
              />
              <div class="input-group-append">
                <select
                  color="green"
                  class="form-select"
                  v-model="trade.currency_id"
                >
                  <option
                    v-for="item in currencies"
                    :key="item"
                    :value="item.id"
                  >
                    {{ item.currency }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="input-group">
              <input
                type="number"
                min="0"
                color="green"
                class="form-control"
                placeholder="miqdor"
                required
                v-model="trade.quantity"
              />
              <div class="input-group-text">dona</div>
            </div>
          </div>
        </div>
      </form>
    </template>
    <template #footer>
      <btn form="trade-form">
        <i class="far fa-circle-check"></i>
      </btn>
      <btn color="red" data-dismiss="modal" close-add-trade>
        <i class="far fa-circle-xmark"></i>
      </btn>
    </template>
  </modal>
</template>

<script>
import * as api from "../../utils/api";
import pagination from "@/components/pagination/pagination.vue";
export default {
  name: "mijoz",
  components: { pagination },
  data() {
    return {
      _: Intl.NumberFormat(),
      orders: [],
      order: null,
      warehouses: [],
      warehouse_id: 0,
      search: "",
      products: null,
      product: null,
      currencies: [],
      trade: {
        cat_id: null,
        brand_id: null,
        name: "",
        quantity: null,
        price: null,
        currency_id: null,
        order_id: null,
        warehouse_id: null,
      },
      trades: null,
    };
  },
  created() {
    this.getOrders();
  },
  methods: {
    getOrders() {
      api.orders(this.$route.params.id, 0, false, 0, 10).then((val) => {
        this.orders = val.data;
        this.order = val.data[0];
        if (this.order) {
          this.getWarehouses();
        }
      });
    },
    addOrder() {
      api.createOrder({ shop_id: this.$route.params.id }).then((val) => {
        api.success().then(() => {
          this.getOrders();
        });
      });
    },
    deleteOrder() {
      api.removeOrder({ id: this.order?.id }).then((val) => {
        api.success().then(() => {
          this.getOrders();
        });
      });
    },
    confirmOrder() {
      api.confirmationOrder({ id: this.order?.id }).then((val) => {
        api.success().then(() => {
          this.getOrders();
        });
      });
    },
    getWarehouses() {
      api.warehouses().then((val) => {
        this.warehouses = val;
        if (this.warehouses.length) {
          this.warehouse_id = this.warehouses[0].id;
        }
        this.getProducts(0, 25, true);
      });
    },
    getProducts(page, limit, next) {
      api
        .warehouseProducts(this.warehouse_id, this.search, page, limit)
        .then((val) => {
          this.products = val;
          if (next) this.getTrades(0, 25);
        });
    },
    getCurrencies() {
      api.currencies().then((val) => {
        this.currencies = val;
      });
    },
    getTrades(page, limit) {
      api.trades(this.order.id, page, limit).then((val) => {
        this.trades = val;
      });
    },
    addTrade() {
      this.trade.brand_id = this.product?.Warehouse_products?.brand?.id;
      this.trade.cat_id = this.product?.Warehouse_products?.brand?.category?.id;
      this.trade.name = this.product?.Warehouse_products?.name;
      this.trade.order_id = this.order?.id;
      this.trade.warehouse_id = this.warehouse_id;
      api.toTrade(this.trade).then((val) => {
        api.success("close-add-trade").then(() => {
          this.trade = {
            cat_id: null,
            brand_id: null,
            name: "",
            quantity: null,
            price: null,
            currency_id: null,
            order_id: null,
            warehouse_id: null,
          };
          this.getProducts(0, 25, true);
        });
      });
    },
    deleteTrade(id) {
      api.removeTrade(id).then((val) => {
        api.success().then(() => {
          this.getProducts(0, 25, true);
        });
      });
    },
  },
};
</script>
