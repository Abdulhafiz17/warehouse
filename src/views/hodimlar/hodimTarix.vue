<template>
  <div class="row gap-1">
    <div class="col-12">
      <card color="green">
        <div class="row">
          <div class="col-md-4 text-start">
            <h3>Hodim {{ user?.name }}</h3>
          </div>
        </div>
      </card>
    </div>

    <div class="col-12">
      <card color="green">
        <ul class="responsive-y" style="max-height: 83vh">
          <li
            v-for="item in orders?.data"
            :key="item"
            @click="
              order = item;
              getBalance();
            "
          >
            <span>{{ "Buyurtma id: " + item.id }}</span>
            <span>{{ item.time.replace("T", " ") }}</span>
          </li>
          <div>
            <pagination
              :page="orders?.current_page"
              :pages="orders?.pages"
              :limit="orders?.limit"
              @get="getOrders"
            />
          </div>
        </ul>
      </card>
    </div>
  </div>

  <button v-show="false" data-toggle="modal" data-target="#order"></button>
  <modal id="order" size="lg">
    <template #header>
      <h4>{{ "Buyurtma id: " + order?.id }}</h4>
      <strong>{{ order?.time.replace("T", " ") }}</strong>
    </template>
    <template #body>
      <div class="row gap-1">
        <div class="col-12 text-start">
          <h5>
            Buyurtma summasi:
            <span v-for="item in balance" :key="item">
              {{ _.format(item.sum_price) + " " + item.currency }}
            </span>
          </h5>
        </div>
        <div class="col-12">
          <div class="responsive-y" style="max-height: 65vh">
            <div class="table-responsive">
              <table class="table table-sm table-hover">
                <thead>
                  <tr>
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
                    <td colspan="6">
                      <pagination
                        :page="trades?.current_page"
                        :pages="trades?.pages"
                        :limit="trades?.limit"
                        @get="getTrades"
                      />
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <btn color="red" data-dismiss="modal">
        <i class="far fa-circle-xmark"></i>
      </btn>
    </template>
  </modal>
</template>

<script>
import * as api from "../../utils/api";
import pagination from "@/components/pagination/pagination.vue";
export default {
  name: "hodimTarix",
  components: { pagination },
  data() {
    return {
      _: Intl.NumberFormat(),
      user: null,
      orders: null,
      order: null,
      balance: null,
      trades: null,
    };
  },
  created() {
    this.get();
  },
  methods: {
    get() {
      api.user(this.$route.params.id).then((val) => {
        this.user = val;
        this.getOrders(0, 25);
      });
    },
    getOrders(page, limit) {
      api.orders(0, this.$route.params.id, true, page, limit).then((val) => {
        this.orders = val;
      });
    },
    getBalance() {
      api.orderBalance(this.order.id).then((val) => {
        this.balance = val;
        this.getTrades(0, 25, true);
      });
    },
    getTrades(page, limit, toggle) {
      api.trades(this.order.id, 0, 0, page, limit).then((val) => {
        this.trades = val;
        if (toggle) document.querySelector(`[data-target="#order"]`).click();
      });
    },
  },
};
</script>
