<template>
  <form @submit.prevent="add.name && add.category_id ? postBrand(add) : false">
    <div class="input-group">
      <input
        type="text"
        class="form-control"
        color="green"
        placeholder="yangi brend"
        required
        v-model="add.name"
      />
      <div class="dropdown">
        <btn
          class="dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          color="green"
        >
          {{
            add.category_id
              ? categories?.data.find(({ id }) => id == add.category_id).name
              : "Kategoriya"
          }}
        </btn>
        <div
          class="dropdown-menu responsive-y"
          style="max-height: 20vh"
          aria-labelledby="dropdownMenuButton"
          categories-dropdown
          @scroll="scrollCategories()"
        >
          <ul>
            <li
              v-for="item in categories?.data"
              @click="add.category_id = item.id"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div>
      <div class="input-group-append">
        <btn color="green">
          <i class="fa fa-plus"></i>
        </btn>
      </div>
    </div>
  </form>
  <div class="responsive-y mt-1" style="height: 80vh">
    <div class="row gap-1">
      <div class="col-12" v-for="item in categories.data" :key="item">
        <collapse @click="get(0, 25, item)">
          <template #header>
            {{ item.name }}
          </template>
          <template #body>
            <div class="row gap-1">
              <div class="col-12" v-for="item2 in item.brands?.data">
                <form @submit.prevent="putBrand(item2)">
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      color="green"
                      placeholder="yangi brend"
                      required
                      v-model="item2.name"
                    />
                    <div class="input-group-append">
                      <btn color="yellow">
                        <i class="fa fa-edit"></i>
                      </btn>
                    </div>
                  </div>
                </form>
              </div>
              <div class="col-12">
                <pagination
                  :page="item.brands?.current_page"
                  :pages="item.brands?.pages"
                  :limit="item.brands?.limit"
                  @get="get"
                />
              </div>
            </div>
          </template>
        </collapse>
      </div>
    </div>
  </div>
</template>

<script>
import pagination from "@/components/pagination/pagination.vue";
import * as api from "../../utils/api";
export default {
  name: "brands",
  components: { pagination },
  data() {
    return {
      categories: { current_page: 0, pages: 1, limit: 25, data: [] },
      add: { name: "", category_id: 0 },
    };
  },
  created() {
    this.getCategories(0, 25);
  },
  methods: {
    getCategories(page, limit) {
      api.categories("", page, limit).then((val) => {
        this.categories = val;
        this.categories.data.forEach((item) => {
          item.brands = null;
        });
      });
    },
    get(page, limit, data) {
      api.brands("", data.id, page, limit).then((val) => {
        data.brands = val;
      });
    },
    postBrand(brand) {
      api.createBrand(brand).then((val) => {
        api.success().then(() => {
          this.add.name = "";
          this.add.category_id = 0;
          this.getCategories(0, 25);
        });
      });
    },
    putBrand(brand) {
      api.updateBrand(brand).then((val) => {
        api.success().then(() => {
          this.getCategories(0, 25);
        });
      });
    },
    scrollCategories() {
      const div = document.querySelector("[categories-dropdown]");
      if (div.scrollTop + div.clientHeight >= div.scrollHeight) {
        if (this.categories?.current_page < this.categories?.pages - 1) {
          api
            .categories("", this.categories?.current_page + 1, 25)
            .then((val) => {
              this.categories.data = this.categories.data.concat(val.data);
            });
        }
      }
    },
  },
};
</script>
