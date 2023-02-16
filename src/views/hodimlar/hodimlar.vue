<template>
  <div class="row mb-1">
    <div class="col-12">
      <card color="green">
        <div class="row">
          <div class="col-4 text-start">
            <h3>Hodimlar</h3>
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
              data-target="#add-user"
              >Hodim qo'shish</btn
            >
          </div>
        </div>
      </card>
    </div>
  </div>

  <div class="responsive-y" style="max-height: 85vh">
    <div class="row">
      <div class="col-md-4 mb-1" v-for="item in users.data" :key="item">
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
              <span class="material-symbols-outlined"> manage_accounts </span>
              <span>{{ item.role == "admin" ? item.role : "Xodim" }}</span>
            </li>
          </ul>
          <div class="row my-1">
            <div class="col">
              <btn
                block="true"
                color="yellow"
                data-toggle="modal"
                data-target="#edit-user"
                @click="
                  edit.id = item.id;
                  edit.name = item.name;
                  edit.phone = item.phone;
                  edit.role = item.role;
                  edit.status = item.status;
                  edit.username = item.username;
                "
              >
                <span class="material-symbols-outlined"> edit </span>
              </btn>
            </div>
          </div>
        </card>
      </div>
      <div class="col-12">
        <pagination
          :page="users.current_page"
          :pages="users.pages"
          :limit="users.limit"
          @get="get"
        />
      </div>
    </div>
  </div>

  <modal id="add-user">
    <template #header>
      <h4>Hodim qo'shish</h4>
    </template>
    <template #body>
      <form id="add-form" @submit.prevent="postUser(add)">
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
              Vazifasi
              <select
                class="form-select"
                color="green"
                required
                v-model="add.role"
              >
                <option value="admin">admin</option>
                <option value="worker">ishchi</option>
              </select>
            </label>
          </div>
          <div class="col-12">
            <div class="row">
              <div class="col-6">
                <label>
                  Foydaanuvchi nomi
                  <input
                    type="text"
                    color="green"
                    class="form-control"
                    required
                    v-model="add.username"
                  />
                </label>
              </div>
              <div class="col-6">
                <label>
                  Parol
                  <input
                    type="password"
                    color="green"
                    class="form-control"
                    required
                    v-model="add.password"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </template>
    <template #footer>
      <btn form="add-form"><i class="far fa-circle-check"></i></btn>
      <btn color="red" data-dismiss="modal" close-add-user
        ><i class="far fa-circle-xmark"></i
      ></btn>
    </template>
  </modal>

  <modal id="edit-user">
    <template #header>
      <h4>Hodim tahrirlash</h4>
    </template>
    <template #body>
      <form id="edit-form" @submit.prevent="putUser(edit)">
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
              Vazifasi
              <select
                class="form-select"
                color="green"
                required
                v-model="edit.role"
              >
                <option value="admin">admin</option>
                <option value="worker">ishchi</option>
              </select>
            </label>
          </div>
          <div class="col-12">
            <div class="row">
              <div class="col-6">
                <label>
                  Foydalanuvchi nomi
                  <input
                    type="text"
                    color="green"
                    class="form-control"
                    required
                    v-model="edit.username"
                  />
                </label>
              </div>
              <div class="col-6">
                <label>
                  Parol
                  <input
                    type="password"
                    color="green"
                    class="form-control"
                    v-model="edit.password"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </template>
    <template #footer>
      <btn form="edit-form"><i class="far fa-circle-check"></i></btn>
      <btn color="red" data-dismiss="modal" close-edit-user
        ><i class="far fa-circle-xmark"></i
      ></btn>
    </template>
  </modal>
</template>

<script>
import pagination from "../../components/pagination/pagination.vue";
import * as api from "../../utils/api";
export default {
  name: "hodimlar",
  components: { pagination },
  data() {
    return {
      search: "",
      status: true,
      users: { current_page: 0, pages: 0, limit: 25, data: [] },
      add: {
        id: 0,
        name: "",
        username: "",
        password: "",
        role: "",
        phone: null,
        status: true,
      },
      edit: {
        id: 0,
        name: "",
        username: "",
        password: "",
        role: "",
        phone: null,
        status: true,
      },
    };
  },
  created() {
    this.get(0, 25);
  },
  methods: {
    get(page, limit) {
      api.users(this.search, this.status, page, limit).then((val) => {
        this.users = val;
      });
    },
    postUser(user) {
      api.createUser(user).then((val) => {
        api.success("close-add-user").then(() => {
          this.get(0, 25);
        });
      });
    },
    putUser(user) {
      api.updateUser(user).then((val) => {
        api.success("close-edit-user").then(() => {
          this.get(0, 25);
        });
      });
    },
  },
};
</script>
