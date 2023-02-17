<template>
  <div class="row mb-1">
    <div class="col-12">
      <card color="green">
        <div class="row">
          <div class="col-md-4 text-start">
            <h3>Ta'minotlar</h3>
          </div>
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <btn color="green" block="true" @click="postParty()">
              Ta'minot qo'shish
            </btn>
          </div>
        </div>
      </card>
    </div>
  </div>

  <div class="row">
    <div class="col-md-6">
      <card color="green">
        <h4>Faol</h4>
        <div class="responsive-y" style="max-height: 79vh">
          <ul>
            <li
              v-for="item in parties_false?.data"
              :key="item"
              :to="`/taminot/${item.id}`"
              @click="route(item)"
            >
              <span>
                {{ "Ta'minot id: " + item.id }}
              </span>
              <span>
                {{ item.time }}
              </span>
            </li>
          </ul>
        </div>
      </card>
    </div>
    <div class="col-md-6">
      <card color="green">
        <h4>Yakunlangan</h4>
        <div class="responsive-y" style="max-height: 79vh">
          <ul>
            <li
              v-for="item in parties_true?.data"
              :key="item"
              :to="`/taminot/${item.id}`"
              @click="route(item)"
            >
              <span>
                {{ "Ta'minot id: " + item.id }}
              </span>
              <span>
                {{ item.time }}
              </span>
            </li>
          </ul>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import pagination from "@/components/pagination/pagination.vue";
import * as api from "../../utils/api";
export default {
  name: "taminotlar",
  components: { pagination },
  data() {
    return {
      parties_true: null,
      parties_false: null,
    };
  },
  created() {
    this.getFalse(0, 25, true);
  },
  methods: {
    getFalse(page, limit, next) {
      api.parties(false, page, limit).then((val) => {
        this.parties_false = val;
        if (next) this.getTrue(0, 25);
      });
    },
    getTrue(page, limit) {
      api.parties(true, page, limit).then((val) => {
        this.parties_true = val;
      });
    },
    postParty() {
      api.createParty().then((val) => {
        api.success().then(() => {
          this.getFalse(0, 25);
        });
      });
    },
    route(data) {
      localStorage.setItem("supply_status", data.status);
      this.$router.push(`/taminot/${data.id}`);
    },
  },
};
</script>

<style scoped></style>
