<template>
  <form @submit.prevent="postCategory(add)">
    <div class="input-group">
      <input
        type="text"
        class="form-control"
        color="green"
        placeholder="yangi kategoriya"
        required
        v-model="add.name"
      />
      <div class="input-group-append">
        <btn color="green">
          <i class="fa fa-plus"></i>
        </btn>
      </div>
    </div>
  </form>
  <div class="responsive-y mt-1" style="height: 80vh">
    <div class="row gap-1">
      <div class="col-12" v-for="item in categories?.data">
        <form @submit.prevent="putCategory(item)">
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              color="green"
              placeholder="yangi kategoriya"
              required
              v-model="item.name"
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
          :page="categories?.current_page"
          :pages="categories?.pages"
          :limit="categories?.limit"
          @get="get"
        />
      </div>
    </div>
  </div>
</template>

<script>
import pagination from "@/components/pagination/pagination.vue";
import * as api from "../../utils/api";
export default {
  name: "categories",
  components: { pagination },
  data() {
    return {
      categories: null,
      add: { name: "" },
    };
  },
  created() {
    this.get(0, 25);
  },
  methods: {
    get(page, limit) {
      api.categories("", page, limit).then((val) => {
        this.categories = val;
      });
    },
    postCategory(category) {
      api.createCategory(category).then((val) => {
        api.success().then(() => {
          this.add.name = "";
          this.get(0, 25);
        });
      });
    },
    putCategory(category) {
      api.updateCategory(category).then((val) => {
        api.success().then(() => {
          this.get(0, 25);
        });
      });
    },
  },
};
</script>
