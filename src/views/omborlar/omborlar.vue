<template>
  <div class="row mb-1">
    <div class="col-12">
      <card color="green">
        <div class="row">
          <div class="col-4 text-start">
            <h3>Omborlar</h3>
          </div>
          <div class="col-4" v-if="!creatable?.length"></div>
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
          <div class="col-4" v-if="creatable?.length">
            <btn
              color="green"
              block="true"
              data-toggle="modal"
              data-target="#add-warehouse"
              >Ombor qo'shish</btn
            >
          </div>
        </div>
      </card>
    </div>
  </div>

  <div class="responsive-y" style="max-height: 85vh">
    <div class="row">
      <div class="col-md-4 mb-1" v-for="item in warehouses" :key="item">
        <card color="green">
          <ul>
            <li>
              <span class="material-symbols-outlined"> person </span>
              <span>{{ item.name }}</span>
            </li>
            <li>
              <span class="material-symbols-outlined"> location_on </span>
              <span>{{ item.address }}</span>
            </li>
          </ul>
          <div class="row my-1">
            <div class="col">
              <router-link :to="`/ombor/${item.id}`">
                <btn block="true" color="green">
                  <i class="fa fa-door-open"></i>
                </btn>
              </router-link>
            </div>
            <div class="col">
              <btn
                block="true"
                color="yellow"
                data-toggle="modal"
                data-target="#edit-warehouse"
                @click="
                  edit.id = item.id;
                  edit.name = item.name;
                  edit.address = item.address;
                "
              >
                <i class="fa fa-edit"></i>
              </btn>
            </div>
          </div>
        </card>
      </div>
    </div>
  </div>

  <modal id="add-warehouse">
    <template #header>
      <h4>Ombor qo'shish</h4>
    </template>
    <template #body>
      <form id="add-form" @submit.prevent="postWarehouse(add)">
        <div class="row">
          <div class="col-12">
            <label>
              Nomi
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
      <btn color="red" data-dismiss="modal" close-add-warehouse
        ><i class="far fa-circle-xmark"></i
      ></btn>
    </template>
  </modal>

  <modal id="edit-warehouse">
    <template #header>
      <h4>Omborni tahrirlash</h4>
    </template>
    <template #body>
      <form id="edit-form" @submit.prevent="putWarehouse(edit)">
        <div class="row">
          <div class="col-12">
            <label>
              Nomi
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
      <btn color="red" data-dismiss="modal" close-edit-warehouse
        ><i class="far fa-circle-xmark"></i
      ></btn>
    </template>
  </modal>
</template>

<script>
import * as api from "../../utils/api";
export default {
  name: "omborlar",
  data() {
    return {
      creatable: localStorage.getItem("скуфефиду"),
      search: "",
      status: true,
      warehouses: [],
      add: {
        name: "",
        address: "",
      },
      edit: {
        id: 0,
        name: "",
        address: "",
      },
    };
  },
  created() {
    this.get();
  },
  methods: {
    get() {
      api.warehouses(this.search).then((val) => {
        this.warehouses = val;
        if (this.creatable?.length) {
          this.creatable = null;
          localStorage.removeItem("скуфефиду");
        }
      });
    },
    postWarehouse(warehouse) {
      api.createWarehouse(warehouse).then((val) => {
        api.success("close-add-warehouse").then(() => {
          this.get(0, 25);
        });
      });
    },
    putWarehouse(warehouse) {
      api.updateWarehouse(warehouse).then((val) => {
        api.success("close-edit-warehouse").then(() => {
          this.get();
        });
      });
    },
  },
};
</script>
