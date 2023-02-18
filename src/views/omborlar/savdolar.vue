<template>
  <div class="responsive-y" style="max-height: 77vh">
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

<script>
import * as api from "../../utils/api";
import pagination from "@/components/pagination/pagination.vue";
export default {
  name: "savdolar",
  components: { pagination },
  data() {
    return {
      _: Intl.NumberFormat(),
      trades: null,
    };
  },
  created() {
    this.get(0, 25);
  },
  methods: {
    get(page, limit) {
      api.trades(0, this.$route.params.id, 0, page, limit).then((val) => {
        this.trades = val;
      });
    },
  },
};
</script>
