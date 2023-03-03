<template>
  <div class="row gap-1 mb-1">
    <div class="col-12">
      <card color="green">
        <div class="row">
          <div class="col-md-4 text-start">
            <h3>{{ market?.name }}dan ta'minot olish</h3>
          </div>
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <btn
              color="green"
              block="true"
              data-toggle="modal"
              data-target="#confirm"
              v-if="party"
            >
              Ta'minotni yakunlash
            </btn>
          </div>
        </div>
      </card>
    </div>
    <div class="col-12">
      <card color="green">
        <li>
          <span>
            Ta'minot summasi:
            <strong v-for="item in balance.total_supply_price" :key="item">{{
              _.format(item.total_supply_price) + " " + item.currency + " "
            }}</strong>
          </span>
          <span>
            Chiqim summasi:
            <strong v-for="item in balance.total_expence_price" :key="item">{{
              _.format(item.total_expence_price) + " " + item.currency + " "
            }}</strong>
          </span>
        </li>
      </card>
    </div>
  </div>
  <tabs
    :buttons="[`Mahsulotlar`, `Xarajatlar`]"
    :slots="[`products`, `expenses`]"
  >
    <template #products>
      <Products :party="party" @getBalance="getBalance" ref="products" />
    </template>
    <template #expenses>
      <Expenses :party="party" @getBalance="getBalance" ref="expenses" />
    </template>
  </tabs>

  <div class="modal fade" id="confirm">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4>Ta'minotni yakunlash</h4>
        </div>
        <div class="modal-body">
          <div class="row gap-2 text-left">
            <form @submit.prevent="confirmParty()" id="form">
              <label class="col-md-12">
                Xarajatlarni yaxlitlash uchun valyuta tanlang
                <select
                  color="green"
                  class="form-select"
                  required
                  v-model="currency_id"
                >
                  <option value="">valyuta</option>
                  <option
                    v-for="item in currencies"
                    :key="item"
                    :value="item.id"
                  >
                    {{ item.currency }}
                  </option>
                </select>
              </label>
            </form>
            <div class="col-md-12">
              <div class="row">
                <span> Chiqimlarni yaxlitlash turi </span>
                <div class="col-md-6">
                  <button
                    class="btn btn-sm btn-block"
                    :class="to_price ? 'btn-primary' : 'btn-outline-primary'"
                    @click="to_price = true"
                  >
                    Narx bo'yicha
                  </button>
                </div>
                <div class="col-md-6">
                  <button
                    class="btn btn-sm btn-block"
                    :class="to_price ? 'btn-outline-primary' : 'btn-primary'"
                    @click="to_price = false"
                  >
                    Miqdor bo'yicha
                  </button>
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <p class="text-center">
                <strong>Omborlar</strong>
              </p>
              <ul class="responsive-y" style="max-height: 40vh">
                <button
                  class="btn btn-light"
                  v-for="item in warehouses"
                  :key="item"
                  @click="warehouse_id = item.id"
                  form="form"
                >
                  {{ item.name }}
                </button>
              </ul>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <btn color="red" data-dismiss="modal" close-confirm-party>
            <i class="far fa-circle-xmark" />
          </btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from "../../utils/api";
import Products from "./Ta'minotMahsulotlari.vue";
import Expenses from "./Ta'minotChiqimlari.vue";
export default {
  name: "taminot",
  components: { Products, Expenses },
  data() {
    return {
      _: Intl.NumberFormat(),
      market: null,
      party: null,
      supply_status: localStorage.getItem("supply_status"),
      balance: {
        total_supply_price: [],
        total_expence_price: [],
      },
      currencies: [],
      currency_id: "",
      warehouses: [],
      warehouse_id: null,
      to_price: true,
    };
  },
  created() {
    this.getMarket();
    this.getParties();
    this.getCurrencies();
  },
  methods: {
    getMarket() {
      api.market(this.$route.params.id).then((val) => {
        this.market = val;
      });
    },
    getParties() {
      api.parties(false, this.$route.params.id, 0, 1).then((val) => {
        this.party = val.data[0];
        if (this.party) {
          setTimeout(() => {
            if (this.$refs.products) {
              this.$refs.products.getSupplies(0, 25);
            } else if (this.$refs.expenses) {
              this.$refs.expenses.getExpenses();
            }
          }, 500);
        } else {
          this.postParty();
        }
      });
    },
    postParty() {
      api.createParty(this.$route.params.id).then((val) => {
        this.getParties();
      });
    },
    getBalance() {
      api.partyBalance(this.party.id).then((val) => {
        this.balance = val;
      });
    },
    getCurrencies() {
      api.currencies().then((Response) => {
        this.currencies = Response;
        this.getWarehouses();
      });
    },
    getWarehouses() {
      api.warehouses().then((val) => {
        this.warehouses = val;
      });
    },
    confirmParty() {
      let data = {
        party_id: this.party.id,
        warehouse_id: this.warehouse_id,
        currency_id: this.currency_id,
        to_price: this.to_price,
      };
      api.confirmationParty(data).then((Response) => {
        api.success("close-confirm-party").then(() => {
          this.$router.push("/taminotchilar");
        });
      });
    },
  },
};
</script>
