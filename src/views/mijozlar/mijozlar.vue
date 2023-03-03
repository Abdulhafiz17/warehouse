<template>
  <div class="row mb-1">
    <div class="col-12">
      <card color="green">
        <div class="row">
          <div class="col-md-4 text-start">
            <h3>Magazinlar</h3>
          </div>
          <div class="col-md-4">
            <input
              type="search"
              placeholder="qidiruv"
              color="green"
              class="form-control"
              v-model="search"
              @keyup="get(0, 25)"
            />
          </div>
          <div class="col-md-4">
            <btn
              color="green"
              block="true"
              data-toggle="modal"
              data-target="#add-shop"
              >Magazin qo'shish</btn
            >
          </div>
        </div>
      </card>
    </div>
  </div>

  <div class="responsive-y" style="max-height: 85vh">
    <div class="row">
      <div class="col-md-4 mb-1" v-for="item in shops.data" :key="item">
        <card color="green">
          <ul>
            <li>
              <i class="fa fa-user"></i>
              <strong>{{ item.name }}</strong>
            </li>
            <li>
              <i class="fa fa-phone"></i>
              <a :href="`tel:+998${item.phone}`">{{ "+998" + item.phone }}</a>
            </li>
            <li>
              <i class="fa fa-location-dot"></i>
              <span>{{ item.address }}</span>
            </li>
            <li>
              <i class="fa fa-coins"></i>
              <span>
                <strong
                  v-for="item2 in item.balances"
                  :key="item2"
                  :class="
                    item2.balance > 0
                      ? 'text-success'
                      : item2.balance < 0
                      ? 'text-danger'
                      : ''
                  "
                >
                  {{ _.format(item2.balance) + " " + item2.currency.currency }}
                  <br />
                </strong>
                <span v-if="!item.balances.length">0</span>
              </span>
            </li>
          </ul>
          <div class="row my-1">
            <div class="col">
              <router-link :to="`/mijozTarix/${item.id}`">
                <btn block="true" color="cyan">
                  <i class="fa fa-history"></i>
                </btn>
              </router-link>
            </div>
            <div class="col">
              <router-link :to="`/mijoz/${item.id}`">
                <btn color="green" block="true">
                  <i class="fa fa-box"></i>
                </btn>
              </router-link>
            </div>
            <div class="col">
              <btn
                block="true"
                data-toggle="modal"
                data-target="#pay"
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
                data-target="#edit-shop"
                @click="
                  edit.id = item.id;
                  edit.name = item.name;
                  edit.address = item.address;
                  edit.phone = item.phone;
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
          :page="shops.current_page"
          :pages="shops.pages"
          :limit="shops.limit"
          @get="get"
        />
      </div>
    </div>
  </div>

  <modal id="add-shop">
    <template #header>
      <h4>Magazin qo'shish</h4>
    </template>
    <template #body>
      <form id="add-form" @submit.prevent="postShop(add)">
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
      <btn color="red" data-dismiss="modal" close-add-shop
        ><i class="far fa-circle-xmark"></i
      ></btn>
    </template>
  </modal>

  <modal id="edit-shop">
    <template #header>
      <h4>Magazin tahrirlash</h4>
    </template>
    <template #body>
      <form id="edit-form" @submit.prevent="putShop(edit)">
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
      <btn color="red" data-dismiss="modal" close-edit-shop
        ><i class="far fa-circle-xmark"></i
      ></btn>
    </template>
  </modal>

  <modal id="pay">
    <template #header> Mijozdan pul olish </template>
    <template #body>
      <form id="pay-form" @submit.prevent="payFromShop(pay)">
        <div class="row gap-1">
          <div class="col-12">
            <div class="input-group">
              <input
                type="number"
                min="0"
                step="any"
                placeholder="summa"
                required
                color="green"
                class="form-control"
                v-model="pay.money"
              />
              <div class="input-group-append">
                <select
                  color="green"
                  class="form-select"
                  v-model="pay.currency_id"
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
            <textarea
              cols="30"
              rows="2"
              placeholder="izoh"
              color="green"
              class="form-control"
              v-model="pay.comment"
            ></textarea>
          </div>
        </div>
      </form>
    </template>
    <template #footer>
      <btn form="pay-form"><i class="far fa-circle-check"></i></btn>
      <btn color="red" data-dismiss="modal" close-pay
        ><i class="far fa-circle-xmark"></i
      ></btn>
    </template>
  </modal>
</template>

<script>
import pagination from "../../components/pagination/pagination.vue";
import * as api from "../../utils/api";
export default {
  name: "mijozlar",
  components: { pagination },
  data() {
    return {
      _: Intl.NumberFormat(),
      search: "",
      shops: { current_page: 0, pages: 0, limit: 25, data: [] },
      add: {
        name: "",
        address: "",
        phone: "",
      },
      edit: {
        id: 0,
        name: "",
        address: "",
        phone: "",
      },
      currencies: [],
      pay: {
        money: null,
        currency_id: null,
        source: null,
        comment: "",
      },
    };
  },
  created() {
    this.get(0, 25);
  },
  methods: {
    get(page, limit) {
      api.shops(this.search, page, limit).then((val) => {
        this.shops = val;
        this.getCurrencies();
      });
    },
    getCurrencies() {
      api.currencies().then((val) => {
        this.currencies = val;
      });
    },
    postShop(shop) {
      api.createShop(shop).then((val) => {
        api.success("close-add-shop").then(() => {
          this.get(0, 25);
        });
      });
    },
    putShop(shop) {
      api.updateShop(shop).then((val) => {
        api.success("close-edit-shop").then(() => {
          this.get(0, 25);
        });
      });
    },
    payFromShop(data) {
      api.takeMoneyFromShop(data).then((val) => {
        api.success("close-pay").then(() => {
          this.pay = {
            money: null,
            currency_id: null,
            source: null,
            comment: "",
          };
          this.get(0, 25);
        });
      });
    },
  },
};
</script>
