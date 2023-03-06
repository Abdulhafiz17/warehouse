<template>
  <div class="row mb-1">
    <div class="col-12">
      <card color="green">
        <div class="row">
          <div class="col-md-4 text-start">
            <h3>{{ warehouse?.name }} mahsulotlari</h3>
          </div>
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <input
              type="search"
              class="form-control"
              color="green"
              placeholder="qidiruv"
              v-model="search"
              @keyup="getProducts(0, 25)"
            />
          </div>
        </div>
      </card>
    </div>
  </div>

  <card color="green">
    <div class="table-responsive" style="max-height: 84vh">
      <table class="table table-sm table-hover">
        <thead>
          <tr>
            <th>№</th>
            <th>Kategoriya</th>
            <th>Brend</th>
            <th>Qoldiq</th>
            <th>Tan narx</th>
            <th>Sotuv narx</th>
            <th>
              <btn color="cyan" data-toggle="modal" data-target="#filter">
                <i class="fa fa-filter"></i>
              </btn>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in products?.data" :key="item">
            <td>
              {{
                util.countOrdinalNumber(
                  index,
                  products?.current_page + 1,
                  products?.limit
                )
              }}
            </td>
            <td>{{ item.Warehouse_products.brand.category.name }}</td>
            <td>{{ item.Warehouse_products.brand.name }}</td>
            <td>{{ item.sum_quantity + " dona" }}</td>
            <td>
              {{
                _.format(item.Warehouse_products.tan_narx) +
                " " +
                item.tan_narx_currency
              }}
            </td>
            <td>
              {{
                _.format(item.Warehouse_products.trade_price) +
                " " +
                item.trade_currency
              }}
            </td>
            <td>
              <btn
                color="yellow"
                data-toggle="modal"
                data-target="#edit"
                @click="product = item"
              >
                <i class="fa fa-edit"></i>
              </btn>
              <btn
                color="cyan"
                data-toggle="modal"
                data-target="#history"
                @click="
                  product = item;
                  getSupplies(0, 25, true);
                "
              >
                <i class="fa fa-history"></i>
              </btn>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="9">
              <pagination
                :page="products?.current_page"
                :pages="products?.pages"
                :limit="products?.limit"
                @get="getProducts"
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </card>

  <modal id="edit">
    <template #header>
      <h5>
        {{
          product?.Warehouse_products?.brand?.category?.name +
          " " +
          product?.Warehouse_products?.brand?.name +
          " " +
          product?.Warehouse_products?.name
        }}
      </h5>
    </template>
    <template #body>
      <form id="edit-form" @submit.prevent="putProduct(product)">
        <div class="row">
          <div class="col-12">
            <div class="input-group" v-if="product">
              <input
                color="green"
                type="number"
                step="any"
                min="0"
                placeholder="narx"
                required
                v-model="product.Warehouse_products.trade_price"
              />
              <select
                color="green"
                class="form-select"
                v-model="product.Warehouse_products.trade_currency_id"
              >
                <option v-for="item in currencies" :key="item" :value="item.id">
                  {{ item.currency }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </template>
    <template #footer>
      <btn form="edit-form">
        <i class="far fa-circle-check"></i>
      </btn>
      <btn color="red" data-dismiss="modal" close-edit>
        <i class="far fa-circle-xmark"></i>
      </btn>
    </template>
  </modal>

  <modal id="filter">
    <template #header>
      <h4>Filter</h4>
    </template>
    <template #body>
      <div class="row gap-2">
        <div class="col-12">
          <select color="green" class="form-select" v-model="quantity">
            <option value="true">Qoldiqli</option>
            <option value="false">Qoldiq qugagan</option>
          </select>
        </div>
      </div>
    </template>
    <template #footer>
      <btn data-dismiss="modal" @click="getProducts(0, 25)">
        <i class="far fa-circle-check"></i>
      </btn>
      <btn color="red" data-dismiss="modal">
        <i class="far fa-circle-xmark"></i>
      </btn>
    </template>
  </modal>

  <modal id="history" size="lg">
    <template #header>
      <h5>
        {{
          product?.Warehouse_products?.brand?.category?.name +
          " " +
          product?.Warehouse_products?.brand?.name +
          " " +
          product?.Warehouse_products?.name
        }}
      </h5>
    </template>
    <template #body>
      <tabs
        :buttons="[`Ta'minotlar`, `Savdolar`]"
        :slots="[`supplies`, `trades`]"
      >
        <template #supplies>
          <div class="responsive-y" style="max-height: 65vh">
            <div class="table-responsive">
              <table class="table table-sm table-hover">
                <thead>
                  <tr>
                    <th>Hamkor</th>
                    <th>Kategoriya</th>
                    <th>Brend</th>
                    <th>Miqdor</th>
                    <th>Narx</th>
                    <th>Chiqim</th>
                    <th>Summa</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in supplies?.data" :key="item">
                    <td>{{ item.market.name }}</td>
                    <td>{{ item.brand.category.name }}</td>
                    <td>{{ item.brand.name }}</td>
                    <td>{{ item.quantity + " dona" }}</td>
                    <td>
                      {{ _.format(item.price) + " " + item.currency.currency }}
                    </td>
                    <td>
                      {{
                        _.format(item.added_expense_price) +
                        " " +
                        item.currency.currency
                      }}
                    </td>
                    <td>
                      {{
                        _.format(item.price * item.quantity) +
                        " " +
                        item.currency.currency
                      }}
                    </td>
                    <td></td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="9">
                      <pagination
                        :page="supplies?.current_page"
                        :pages="supplies?.pages"
                        :limit="supplies?.limit"
                        @get="getSupplies"
                      />
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </template>
        <template #trades>
          <div class="responsive-y" style="max-height: 65vh">
            <div class="table-responsive">
              <table class="table table-sm table-hover">
                <thead>
                  <tr>
                    <th>Buyurtma id</th>
                    <th>Kategoriya</th>
                    <th>Brend</th>
                    <th>Nomi</th>
                    <th>Miqdor</th>
                    <th>Narx</th>
                    <th>Summa</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in trades?.data" :key="item">
                    <td>
                      {{ item.Trades.order_id }}
                    </td>
                    <td>
                      {{ item.Trades.warehouse_product.brand.category.name }}
                    </td>
                    <td>
                      {{ item.Trades.warehouse_product.brand.name }}
                    </td>
                    <td>
                      {{ item.Trades.warehouse_product.name }}
                    </td>
                    <td>
                      {{ item.Trades.quantity + " dona" }}
                    </td>
                    <td>
                      {{
                        _.format(item.Trades.price) +
                        " " +
                        item.Trades.currency.currency
                      }}
                    </td>
                    <td>
                      {{
                        _.format(item.Trades.price * item.Trades.quantity) +
                        " " +
                        item.Trades.currency.currency
                      }}
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="7">
                      <pagination
                        :page="trades?.current_page"
                        :pages="trades?.pages"
                        :limit="trades?.limit"
                        @get="get"
                      />
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </template>
      </tabs>
    </template>
  </modal>
</template>

<script>
import pagination from "@/components/pagination/pagination.vue";
import * as api from "../../utils/api";
import * as util from "../../utils/util";
export default {
  name: "ombor",
  components: { pagination },
  data() {
    return {
      _: Intl.NumberFormat(),
      warehouse: null,
      search: "",
      warehouse_id: this.$route.params.id,
      quantity: "true",
      products: null,
      currencies: [],
      product: null,
      supplies: null,
      trades: null,
    };
  },
  setup() {
    return { util };
  },
  created() {
    this.get();
  },
  mounted() {
    document.querySelector(`[name="supplies"]`).onclick = () => {
      this.getSupplies(0, 25);
    };
    document.querySelector(`[name="trades"]`).onclick = () => {
      this.getTrades(0, 25);
    };
  },
  methods: {
    get() {
      api.warehouse(this.$route.params.id).then((val) => {
        this.warehouse = val;
        this.getCurrencies();
      });
    },
    getCurrencies() {
      api.currencies().then((val) => {
        this.currencies = val;
        this.getProducts(0, 25);
      });
    },
    getProducts(page, limit) {
      api
        .warehouseProducts(
          this.warehouse_id,
          this.search,
          this.quantity,
          page,
          limit
        )
        .then((val) => {
          this.products = val;
        });
    },
    getSupplies(page, limit, next) {
      api
        .supplies(
          0,
          this.$route.params.id,
          this.product.Warehouse_products.id,
          page,
          limit
        )
        .then((val) => {
          this.supplies = val;
          if (next) this.getTrades(0, 25);
        });
    },
    getTrades(page, limit) {
      api
        .trades(
          0,
          this.$route.params.id,
          this.product.Warehouse_products.id,
          page,
          limit
        )
        .then((val) => {
          this.trades = val;
        });
    },
    putProduct(product) {
      let data = {
        id: product.Warehouse_products.id,
        trade_price: product.Warehouse_products.trade_price,
        trade_currency_id: product.Warehouse_products.trade_currency_id,
      };
      api.updateWarehouseProductPrice(data).then((val) => {
        api.success("close-edit").then(() => {
          this.getProducts(0, 25);
        });
      });
    },
  },
};
</script>

<style scoped></style>
