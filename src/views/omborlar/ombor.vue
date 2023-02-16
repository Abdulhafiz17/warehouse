<template>
  <div class="row mb-1">
    <div class="col-12">
      <card color="green">
        <div class="row">
          <div class="col-4 text-start">
            <h3>Ombor mahsulotlari</h3>
          </div>
          <div class="col-4"></div>
          <div class="col-4">
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
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="7">
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
  </card>
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
    };
  },
  setup() {
    return { util };
  },
  created() {
    this.getProducts(0, 25);
  },
  methods: {
    getProducts(page, limit) {
      api
        .warehouseProducts(this.warehouse_id, this.search, page, limit)
        .then((val) => {
          this.products = val;
        });
    },
  },
};
</script>

<style scoped></style>
