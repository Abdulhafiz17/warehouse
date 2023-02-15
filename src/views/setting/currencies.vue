<template>
  <form @submit.prevent="postCurrency(add)">
    <div class="input-group">
      <input
        type="text"
        class="form-control"
        color="green"
        placeholder="valyuta nomi"
        required
        v-model="add.currency"
      />
      <input
        type="number"
        min="0"
        class="form-control"
        color="green"
        placeholder="valyuta narxi"
        required
        v-model="add.price"
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
      <div class="col-12" v-for="item in currencies">
        <form @submit.prevent="putCurrency(item)">
          <div class="input-group">
            <div class="input-group-text">1</div>
            <input
              type="text"
              class="form-control"
              color="green"
              placeholder="yangi kategoriya"
              required
              v-model="item.currency"
            />
            <div class="input-group-text">=</div>
            <input
              type="number"
              min="0"
              class="form-control"
              color="green"
              required
              v-model="item.price"
            />
            <div class="input-group-text">so'm</div>
            <div class="input-group-append">
              <btn color="yellow">
                <i class="fa fa-edit"></i>
              </btn>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import pagination from "@/components/pagination/pagination.vue";
import * as api from "../../utils/api";
export default {
  name: "currencies",
  components: { pagination },
  data() {
    return {
      currencies: [],
      add: { currency: "", price: null },
    };
  },
  created() {
    this.get();
  },
  methods: {
    get() {
      api.currencies().then((val) => {
        this.currencies = val;
      });
    },
    postCurrency(currency) {
      api.createCurrency(currency).then((val) => {
        api.success().then(() => {
          this.add.currency = "";
          this.add.price = null;
          this.get();
        });
      });
    },
    putCurrency(currency) {
      api.updateCurrency(currency).then((val) => {
        api.success().then(() => {
          this.get();
        });
      });
    },
  },
};
</script>
