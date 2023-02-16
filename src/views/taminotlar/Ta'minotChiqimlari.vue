<template>
  <div class="row" v-if="supply_status == 'false'">
    <div class="col-md-5">
      <div class="input-group">
        <input
          type="number"
          min="0"
          step="any"
          class="form-control"
          placeholder="chiqim summasi"
          v-model="new_expense.money"
        />
        <div class="input-group-append">
          <div class="dropdown">
            <btn
              id="dropdownMenuButtonCategories"
              type="button"
              block="true"
              class="dropdown-toggle"
              data-toggle="dropdown"
            >
              {{
                new_expense.currency_id
                  ? currencies?.find(
                      (currency) => currency.id == new_expense.currency_id
                    ).currency
                  : "valyuta"
              }}
            </btn>
            <div
              class="dropdown-menu w-100 mt-1"
              aria-labelledby="dropdownMenuButtonCategories"
            >
              <li
                type="button"
                class="text-center"
                disabled
                v-show="!currencies.length"
              >
                <i class="fa-solid fa-circle-notch fa-spin" />
              </li>
              <ul>
                <li
                  v-for="item in currencies"
                  :key="item"
                  @click="new_expense.currency_id = item.id"
                >
                  {{ item.currency }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-5">
      <input
        type="text"
        class="form-control"
        placeholder="izoh"
        v-model="new_expense.comment"
      />
    </div>
    <div class="col-md-2">
      <btn
        block="true"
        :disabled="
          !new_expense.money || !new_expense.currency_id || !new_expense.comment
        "
        @click="postExpense(new_expense)"
      >
        <i class="far fa-circle-check" />
      </btn>
    </div>
  </div>
  <div
    class="responsive-y mt-2"
    :style="`height: ${supply_status == 'false' ? '66vh' : '73vh'}`"
  >
    <ul>
      <li v-for="item in expenses" :key="item">
        <span class="text-left">
          <h5>
            {{
              "Chiqim summasi: " +
              _.format(item.money) +
              " " +
              item.currency.currency
            }}
          </h5>
          <p class="m-0"><strong>Izoh: </strong> {{ item.comment }}</p>
        </span>
      </li>
    </ul>
    <Pagination :page="page" :pages="pages" :limit="limit" @get="getExpenses" />
  </div>
</template>

<script>
import * as api from "../../utils/api";
import Pagination from "../../components/pagination/pagination.vue";
export default {
  name: "Expenses",
  emits: ["setloading", "getBalance"],
  components: { Pagination },
  data() {
    return {
      _: Intl.NumberFormat(),
      supply_status: localStorage.getItem("supply_status"),
      page: 0,
      pages: 1,
      limit: 25,
      currencies: [],
      currency: null,
      new_expense: {
        money: null,
        currency_id: null,
        source: this.$route.params.id,
        comment: null,
      },
      expenses: [],
    };
  },
  created() {
    this.getCurrencies();
  },
  methods: {
    getCurrencies() {
      api.currencies().then((Response) => {
        this.currencies = Response;
        this.getExpenses(0, 25);
      });
    },
    getExpenses(page, limit) {
      this.$emit("setloading", true);
      api.partyExpenses(this.$route.params.id, page, limit).then((Response) => {
        this.page = Response.current_page;
        this.pages = Response.pages;
        this.limit = Response.limit;
        this.expenses = Response.data;
        this.$emit("getBalance");
      });
    },
    postExpense(expense) {
      this.$emit("setloading", true);
      api.payForPartyExpense(expense).then((Response) => {
        api.success().then(() => {
          this.new_expense = {
            money: null,
            currency_id: null,
            source: this.$route.params.id,
            comment: null,
          };
          this.getExpenses(0, 25);
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
