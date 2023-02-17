<template>
  <div class="row" v-if="supply_status == 'false'">
    <div class="col-md-12">
      <btn class="float-right" data-toggle="modal" data-target="#addProduct">
        <i class="fa fa-cart-plus" /> Mahsulot qo'shish
      </btn>
    </div>
  </div>

  <div
    class="responsive-y mt-2"
    :style="`height: ${supply_status == 'false' ? '60vh' : '65vh'}`"
  >
    <div class="table-responsive">
      <table class="table table-sm table-hover">
        <thead>
          <tr>
            <th>Ta'minotchi</th>
            <th>Kategoriya</th>
            <th>Brend</th>
            <th>Nomi</th>
            <th>Miqdor</th>
            <th>Narx</th>
            <th>Summa</th>
            <th>
              <btn color="cyan" data-toggle="modal" data-target="#filter">
                <i class="fa fa-filter" />
              </btn>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in supplies" :key="item">
            <td>{{ item.market.name }}</td>
            <td>{{ item.brand.category.name }}</td>
            <td>{{ item.brand.name }}</td>
            <td>
              {{ item.name }}
            </td>
            <td>
              {{ item.quantity + " dona" }}
            </td>
            <td>{{ _.format(item.price) + " " + item.currency.currency }}</td>
            <td>
              {{
                _.format(item.price * item.quantity) +
                " " +
                item.currency.currency
              }}
            </td>
            <td>
              <btn
                color="red"
                @click="deleteSupply(item.id)"
                v-if="supply_status == 'false'"
              >
                <i class="far fa-circle-xmark" />
              </btn>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="8">
              <Pagination
                :page="supplies_page"
                :pages="supplies_pages"
                :limit="supplies_limit"
                @get="getSupplies"
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>

  <modal id="addProduct">
    <template #header> <h4>Mahsulot qo'shish</h4> </template>
    <template #body>
      <div class="row gap-2">
        <div class="col-md-12">
          <div class="dropdown">
            <btn
              id="dropdownMenuButtonMarkets"
              type="button"
              block="true"
              color="green"
              class="dropdown-toggle"
              data-toggle="dropdown"
              @click="getMarkets()"
            >
              {{ market ? market.name : "Ta'minotchi" }}
            </btn>
            <div
              class="dropdown-menu w-100 mt-1"
              aria-labelledby="dropdownMenuButtonMarkets"
            >
              <ul
                class="responsive-y markets-scroll"
                style="max-height: 20vh"
                @scroll="scrollMarkets()"
              >
                <li v-for="item in markets" :key="item" @click="market = item">
                  {{ item.name }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="dropdown">
            <input
              type="text"
              color="green"
              class="form-control"
              placeholder="kategoriya"
              data-toggle="dropdown"
              v-model="category"
              @keyup="getCategories()"
              @click="getCategories()"
            />
            <div
              class="dropdown-menu w-100 mt-1"
              aria-labelledby="dropdownMenuButtonCategories"
            >
              <ul
                class="responsive-y categories-scroll"
                style="max-height: 20vh"
                @scroll="scrollCategories()"
              >
                <li
                  v-for="item in categories"
                  :key="item"
                  @click="
                    category = item.name;
                    brand = '';
                  "
                >
                  {{ item.name }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="dropdown">
            <input
              type="text"
              color="green"
              class="form-control"
              placeholder="brend"
              data-toggle="dropdown"
              v-model="brand"
              @keyup="getBrands()"
              @click="getBrands()"
            />
            <div
              class="dropdown-menu w-100 mt-1"
              aria-labelledby="dropdownMenuButtonCategories"
            >
              <ul
                class="responsive-y brands-scroll"
                style="max-height: 20vh"
                @scroll="scrollBrands()"
              >
                <li
                  v-for="item in brands"
                  :key="item"
                  @click="brand = item.name"
                >
                  {{ item.name }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <input
            type="text"
            color="green"
            class="form-control"
            placeholder="nomi"
            v-model="new_supply.name"
          />
        </div>
        <div class="col-md-12">
          <div class="input-group">
            <input
              type="number"
              min="0"
              step="any"
              color="green"
              class="form-control"
              placeholder="miqdori"
              required
              v-model="new_supply.quantity"
            />
            <div class="input-group-text">dona</div>
            <!-- <div class="input-group-append">
              <div class="dropdown">
                <button
                  id="dropdownMenuButtonUnit"
                  type="button"
                  class="btn btn-sm btn-block btn-outline-primary dropdown-toggle"
                  data-toggle="dropdown"
                >
                  {{
                    new_supply.olchov_birligi
                      ? new_supply.olchov_birligi
                      : "O'lchov birligi"
                  }}
                </button>
                <div
                  class="dropdown-menu w-100 mt-1"
                  aria-labelledby="dropdownMenuButtonUnit"
                >
                  <button
                    type="button"
                    class="dropdown-item"
                    v-for="item in units"
                    :key="item"
                    @click="new_supply.olchov_birligi = item"
                  >
                    {{ item }}
                  </button>
                </div>
              </div>
            </div> -->
          </div>
        </div>
        <div class="col-md-12">
          <div class="input-group input-group-sm">
            <input
              type="number"
              min="0"
              step="any"
              color="green"
              class="form-control"
              placeholder="narx"
              required
              v-model="new_supply.price"
            />
            <div class="input-group-append">
              <div class="dropdown">
                <btn
                  id="dropdownMenuButtonCategories"
                  type="button"
                  color="green"
                  class="dropdown-toggle"
                  data-toggle="dropdown"
                  @click="getCurrencies()"
                >
                  {{ currency ? currency.currency : "valyuta" }}
                </btn>
                <div
                  class="dropdown-menu w-100 mt-1"
                  aria-labelledby="dropdownMenuButtonCategories"
                >
                  <ul class="responsive-y" style="max-height: 20vh">
                    <li
                      v-for="item in currencies"
                      :key="item"
                      @click="currency = item"
                    >
                      {{ item.currency }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <btn
        :disabled="
          !market ||
          !category ||
          !brand ||
          !new_supply.name ||
          !new_supply.quantity ||
          !new_supply.price ||
          !currency
        "
        @click="addSupply(new_supply)"
      >
        <i class="far fa-circle-check" />
      </btn>
      <btn color="red" data-dismiss="modal" close-add-supply>
        <i class="far fa-circle-xmark" />
      </btn>
    </template>
  </modal>

  <modal id="filter" size="sm">
    <template #header>
      <h4>Qidiruv</h4>
    </template>
    <template #body>
      <div class="row gap-2">
        <div class="col-md-12">
          <div class="dropdown">
            <btn
              id="dropdownMenuButtonMarkets"
              type="button"
              block="true"
              class="dropdown-toggle"
              data-toggle="dropdown"
              @click="getMarkets()"
            >
              {{ supplies_market ? supplies_market.name : "Ta'minotchi" }}
            </btn>
            <div
              class="dropdown-menu w-100 mt-1"
              aria-labelledby="dropdownMenuButtonMarkets"
            >
              <ul
                class="responsive-y markets-scroll"
                style="max-height: 20vh"
                @scroll="scrollMarkets()"
              >
                <li
                  v-for="item in markets"
                  :key="item"
                  @click="supplies_market = item"
                >
                  {{ item.name }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <btn data-dismiss="modal" @click="getSupplies(0, 25)">
        <i class="far fa-circle-check" />
      </btn>
      <btn
        color="red"
        data-dismiss="modal"
        @click="
          supplies_market = null;
          getSupplies(0, 25);
        "
      >
        <i class="fa fa-trash" />
      </btn>
    </template>
  </modal>
</template>

<script>
import * as api from "../../utils/api";
import Pagination from "../../components/pagination/pagination.vue";
export default {
  name: "Products",
  emits: ["getBalance"],
  components: { Pagination },
  data() {
    return {
      _: Intl.NumberFormat(),
      supply_status: localStorage.supply_status,
      markets_search: "",
      markets_page: 0,
      markets_pages: 1,
      markets: [],
      market: null,
      category_search: "",
      categories_page: 0,
      categories_pages: 1,
      categories: [],
      category: "",
      brands_page: 0,
      brands_pages: 1,
      brands: [],
      brand: "",
      type_search: "",
      type_page: 0,
      type_pages: 1,
      types: [],
      currencies: [],
      currency: null,
      units: ["dona", "kg", "litr", "metr"],
      supplies_page: 0,
      supplies_pages: 1,
      supplies_limit: 25,
      supplies_market: null,
      supplies: [],
      new_supply: {
        category_name: "",
        brand_name: "",
        name: "",
        quantity: null,
        price: null,
        currency_id: null,
        market_id: null,
        party_id: this.$route.params.id,
      },
      confirmation_party: {
        party_id: this.$route.params.id,
        warehouse_id: 0,
        currency_id: 0,
        to_price: true,
      },
    };
  },
  created() {
    this.getSupplies(0, 25);
  },
  methods: {
    getSupplies(page, limit) {
      let market_id = this.supplies_market ? this.supplies_market.id : 0;
      api
        .supplies(market_id, this.$route.params.id, page, limit)
        .then((Response) => {
          this.supplies_page = Response.current_page;
          this.supplies_pages = Response.pages;
          this.supplies_limit = Response.limit;
          this.supplies = Response.data;
          this.$emit("getBalance");
        });
    },
    addSupply(supply) {
      supply.market_id = this.market.id;
      supply.category_name = this.category;
      supply.brand_name = this.brand;
      supply.currency_id = this.currency.id;
      api.takeSupply(supply).then((Response) => {
        api.success("close-add-supply").then(() => {
          this.market = null;
          this.category = "";
          this.currency = null;
          this.new_supply = {
            category_name: "",
            brand_name: "",
            name: "",
            quantity: null,
            price: null,
            currency_id: null,
            market_id: null,
            party_id: this.$route.params.id,
          };
          this.getSupplies(0, 25);
        });
      });
    },
    deleteSupply(supply_id) {
      api.removeSupply(supply_id).then((Response) => {
        api.success().then(() => {
          this.getSupplies(0, 25);
        });
      });
    },
    getMarkets() {
      let search = this.markets_search ? this.markets_search : "";
      api.markets(search, 0, 25).then((Response) => {
        this.markets_page = 0;
        this.markets_pages = Response.pages;
        this.markets = Response.data;
      });
    },
    getCategories() {
      let search = this.category
        ? this.category
        : this.category_search
        ? this.category_search
        : "";
      api.categories(search, 0, 25).then((Response) => {
        this.categories_page = 0;
        this.categories_pages = Response.pages;
        this.categories = Response.data;
      });
    },
    getBrands() {
      let category_id = 0;
      let category = this.categories.find(({ name }) => {
        return name == this.category;
      });
      if (category) category_id = category.id;
      api.brands(this.brand, category_id, 0, 25).then((Response) => {
        this.brands_page = 0;
        this.brands_pages = Response.pages;
        this.brands = Response.data;
      });
    },
    getCurrencies() {
      api.currencies().then((Response) => {
        this.currencies = Response;
      });
    },
    scrollMarkets() {
      let div = document.querySelector(".markets-scroll");
      if (div.scrollTop + div.clientHeight >= div.scrollHeight) {
        if (this.markets_page < this.markets_pages - 1) {
          api.markets(this.markets_page + 1, 25).then((Response) => {
            this.markets_page = Response.current_page;
            this.markets = this.markets.concat(Response.data);
          });
        }
      }
    },
    scrollCategories() {
      let div = document.querySelector(".categories-scroll");
      if (div.scrollTop + div.clientHeight >= div.scrollHeight) {
        if (this.categories_page < this.categories_pages - 1) {
          api
            .categories(this.category, this.categories_page + 1, 25)
            .then((Response) => {
              this.categories_page = Response.current_page;
              this.categories = this.categories.concat(Response.data);
            });
        }
      }
    },
    scrollBrands() {
      let div = document.querySelector(".brands-scroll");
      if (div.scrollTop + div.clientHeight >= div.scrollHeight) {
        if (this.brands_page < this.brands_pages - 1) {
          api
            .categories(this.brand_search, 0, this.brands_page + 1, 25)
            .then((Response) => {
              this.brands_page = Response.current_page;
              this.brands = this.brands.concat(Response.data);
            });
        }
      }
    },
  },
};
</script>
