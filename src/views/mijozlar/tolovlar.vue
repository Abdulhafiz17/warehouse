<template>
  <div class="row mb-1">
    <div class="col-md-5">
      <input
        type="date"
        color="green"
        class="form-control"
        v-model="from_time"
      />
    </div>
    <div class="col-md-5">
      <input type="date" color="green" class="form-control" v-model="to_time" />
    </div>
    <div class="col-md-2">
      <btn block="true" @click="get(0, 25)">
        <i class="fa fa-search"></i>
      </btn>
    </div>
  </div>

  <div class="responsive-y" style="max-height: 70vh">
    <div class="table-responsive">
      <table class="table table-sm table-hover">
        <thead>
          <tr>
            <th>Summa</th>
            <th>Izoh</th>
            <th>Sana</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data?.data" :key="item">
            <td>
              {{ _.format(item.money) + " " + item.currency.currency }}
            </td>
            <td>{{ item.comment }}</td>
            <td>{{ item.time.replace("T", " ") }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3">
              <pagination
                :page="data?.current_page"
                :pages="data?.pages"
                :limit="data?.limit"
                @get="get"
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import * as api from "../../utils/api";
import pagination from "@/components/pagination/pagination.vue";
export default {
  name: "tolovlar",
  components: { pagination },
  data() {
    return {
      _: Intl.NumberFormat(),
      from_time: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        .toISOString()
        .substring(0, 10),
      to_time: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 1
      )
        .toISOString()
        .substring(0, 10),
      data: null,
    };
  },
  created() {
    this.get(0, 25);
  },
  methods: {
    get(page, limit) {
      api
        .shopIncomes(
          this.$route.params.id,
          this.from_time,
          this.to_time,
          page,
          limit
        )
        .then((val) => {
          this.data = val;
        });
    },
  },
};
</script>
