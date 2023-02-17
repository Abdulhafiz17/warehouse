<template>
  <div class="row mb-1">
    <div class="col-12">
      <card color="green">
        <div class="row">
          <div class="col-md-4 text-start">
            <h3>Ombor mahsulotlari</h3>
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
    <div class="table-responsive">
      <table class="table table-sm table-hover">
        <thead>
          <tr>
            <th>№</th>
            <th>Kategoriya</th>
            <th>Brend</th>
            <th>Nomi</th>
            <th>Qoldiq</th>
            <th>Narx</th>
            <th>Tan narx</th>
            <th>Sotuv narx</th>
            <th></th>
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
            <td>{{ item.Warehouse_products.name }}</td>
            <td>{{ item.Warehouse_products.quantity + " dona" }}</td>
            <td>
              {{
                _.format(item.Warehouse_products.price) +
                " " +
                item.Warehouse_products.currency.currency
              }}
            </td>
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
        <i class="far fa-circle-xmark"></i>
      </btn>
      <btn color="red" data-dismiss="modal" close-edit>
        <i class="far fa-circle-xmark"></i>
      </btn>
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
      search: "",
      warehouse_id: this.$route.params.id,
      products: null,
      currencies: [],
      product: null,
    };
  },
  setup() {
    return { util };
  },
  created() {
    this.getCurrencies(0, 25);
  },
  methods: {
    getCurrencies(page, limit) {
      api.currencies().then((val) => {
        this.currencies = val;
        this.getProducts(page, limit);
      });
    },
    getProducts(page, limit) {
      api
        .warehouseProducts(this.warehouse_id, this.search, page, limit)
        .then((val) => {
          this.products = val;
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
