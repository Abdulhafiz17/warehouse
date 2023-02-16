<template>
  <div class="row mb-1">
    <div class="col-12">
      <card color="green">
        <div class="row">
          <div class="col-4 text-start">
            <h3>Ta'minotchilar</h3>
          </div>
          <div class="col-4">
            <input
              type="search"
              placeholder="qidiruv"
              color="green"
              class="form-control"
              v-model="search"
              @keyup="get(0, 25)"
            />
          </div>
          <div class="col-4">
            <btn
              color="green"
              block="true"
              data-toggle="modal"
              data-target="#add-market"
              >Ta'minotchi qo'shish</btn
            >
          </div>
        </div>
      </card>
    </div>
  </div>

  <div class="responsive-y" style="max-height: 85vh">
    <div class="row">
      <div class="col-md-4 mb-1" v-for="item in markets.data" :key="item">
        <card color="green">
          <ul>
            <li>
              <span class="material-symbols-outlined"> person </span>
              <span>{{ item.name }}</span>
            </li>
            <li>
              <span class="material-symbols-outlined"> call </span>
              <a :href="`tel:+998${item.phone}`">{{ "+998" + item.phone }}</a>
            </li>
            <li>
              <span class="material-symbols-outlined"> location_on </span>
              <span>{{ item.address }}</span>
            </li>
            <li>
              <i class="fa fa-coins"></i>
              <span>
                <span v-for="item2 in item.balances" :key="item2">
                  {{
                    _.format(item2?.balance) + " " + item2?.currency?.currency
                  }}
                  <br />
                </span>
                <span v-if="!item.balances?.length">0</span>
              </span>
            </li>
          </ul>
          <div class="row my-1">
            <div class="col">
              <btn
                block="true"
                color="green"
                data-toggle="modal"
                data-target="#pay-to-market"
                @click="pay.source = item.id"
              >
                <i class="fa fa-coins"></i>
              </btn>
            </div>
            <div class="col">
              <btn
                block="true"
                color="yellow"
                data-toggle="modal"
                data-target="#edit-market"
                @click="
                  edit.id = item.id;
                  edit.name = item.name;
                  edit.phone = item.phone;
                  edit.address = item.address;
                "
              >
                <i class="fa fa-edit"></i>
              </btn>
            </div>
          </div>
        </card>
      </div>
      <div class="col-12">
        <pagination
          :page="markets.current_page"
          :pages="markets.pages"
          :limit="markets.limit"
          @get="get"
        />
      </div>
    </div>
  </div>

  <modal id="add-market">
    <template #header>
      <h4>Ta'minotchi qo'shish</h4>
    </template>
    <template #body>
      <form id="add-form" @submit.prevent="postMarket(add)">
        <div class="row">
          <div class="col-12">
            <label>
              Ism
              <input
                type="text"
                color="green"
                class="form-control"
                required
                v-model="add.name"
              />
            </label>
          </div>
          <div class="col-12">
            <label>
              Telefon raqam
              <div class="input-group">
                <div class="input-group-text">+998</div>
                <input
                  type="tel"
                  minlength="9"
                  maxlength="9"
                  color="green"
                  class="form-control"
                  required
                  v-model="add.phone"
                />
              </div>
            </label>
          </div>
          <div class="col-12">
            <label>
              Manzil
              <input
                type="text"
                color="green"
                class="form-control"
                required
                v-model="add.address"
              />
            </label>
          </div>
        </div>
      </form>
    </template>
    <template #footer>
      <btn form="add-form"><i class="far fa-circle-check"></i></btn>
      <btn color="red" data-dismiss="modal" close-add-market
        ><i class="far fa-circle-xmark"></i
      ></btn>
    </template>
  </modal>

  <modal id="edit-market">
    <template #header>
      <h4>Ta'minotchini tahrirlash</h4>
    </template>
    <template #body>
      <form id="edit-form" @submit.prevent="putMarket(edit)">
        <div class="row">
          <div class="col-12">
            <label>
              Ism
              <input
                type="text"
                color="green"
                class="form-control"
                required
                v-model="edit.name"
              />
            </label>
          </div>
          <div class="col-12">
            <label>
              Telefon raqam
              <div class="input-group">
                <div class="input-group-text">+998</div>
                <input
                  type="tel"
                  minlength="9"
                  maxlength="9"
                  color="green"
                  class="form-control"
                  required
                  v-model="edit.phone"
                />
              </div>
            </label>
          </div>
          <div class="col-12">
            <label>
              Manzil
              <input
                type="text"
                color="green"
                class="form-control"
                required
                v-model="edit.address"
              />
            </label>
          </div>
        </div>
      </form>
    </template>
    <template #footer>
      <btn form="edit-form"><i class="far fa-circle-check"></i></btn>
      <btn color="red" data-dismiss="modal" close-edit-market
        ><i class="far fa-circle-xmark"></i
      ></btn>
    </template>
  </modal>

  <modal id="pay-to-market">
    <template #header>
      <h4>Ta'minotchiga pul berish</h4>
    </template>
    <template #body>
      <form id="pay-form" @submit.prevent="payToMarket(pay)">
        <div class="row gap-1">
          <div class="col-12">
            <div class="input-group">
              <input
                type="number"
                class="form-control"
                min="0"
                placeholder="summa"
                required
                color="green"
                v-model="pay.money"
              />
              <div class="input-group-append">
                <select
                  class="form-select"
                  color="green"
                  required
                  v-model="pay.currency_id"
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
              </div>
            </div>
          </div>
          <div class="col-12">
            <textarea
              class="form-control"
              cols="30"
              rows="2"
              placeholder="izoh"
              color="green"
              required
              v-model="pay.comment"
            ></textarea>
          </div>
        </div>
      </form>
    </template>
    <template #footer>
      <btn form="pay-form">
        <i class="far fa-circle-check"></i>
      </btn>
      <btn color="red" data-dismiss="modal" close-pay>
        <i class="far fa-circle-xmark"></i>
      </btn>
    </template>
  </modal>
</template>

<script>
import pagination from "../../components/pagination/pagination.vue";
import * as api from "../../utils/api";
export default {
  name: "taminotchilar",
  components: { pagination },
  data() {
    return {
      _: Intl.NumberFormat(),
      search: "",
      status: true,
      markets: { current_page: 0, pages: 0, limit: 25, data: [] },
      add: {
        name: "",
        phone: null,
        address: "",
      },
      edit: {
        id: 0,
        name: "",
        phone: null,
        address: "",
      },
      currencies: [],
      pay: {
        money: null,
        currency_id: 0,
        source: 0,
        comment: "",
      },
    };
  },
  created() {
    this.getCurrencies(0, 25);
  },
  methods: {
    getCurrencies(page, limit) {
      api.currencies().then((val) => {
        this.currencies = val;
        this.get(page, limit);
      });
    },
    get(page, limit) {
      api.markets(this.search, page, limit).then((val) => {
        this.markets = val;
      });
    },
    postMarket(market) {
      api.createMarket(market).then((val) => {
        api.success("close-add-market").then(() => {
          this.get(0, 25);
        });
      });
    },
    putMarket(market) {
      api.updateMarket(market).then((val) => {
        api.success("close-edit-market").then(() => {
          this.get(0, 25);
        });
      });
    },
    payToMarket(data) {
      api.payForMarket(data).then((val) => {
        api.success("close-pay").then(() => {
          this.get(0, 25);
        });
      });
    },
  },
};
</script>
