<template>
  <div class="row mb-1">
    <div class="col-12">
      <card color="green">
        <div class="row">
          <div class="col-4 text-start">
            <h3>Mijozlar</h3>
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
              data-target="#add-shop"
              >Mijoz qo'shish</btn
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
          </ul>
          <div class="row my-1">
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
      <h4>Mijoz qo'shish</h4>
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
      <h4>Mijoz tahrirlash</h4>
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
</template>

<script>
import pagination from "../../components/pagination/pagination.vue";
import * as api from "../../utils/api";
export default {
  name: "mijozlar",
  components: { pagination },
  data() {
    return {
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
    };
  },
  created() {
    this.get(0, 25);
  },
  methods: {
    get(page, limit) {
      api.shops(this.search, page, limit).then((val) => {
        this.shops = val;
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
  },
};
</script>
