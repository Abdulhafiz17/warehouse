<template>
  <div class="responsive-y" style="max-height: 75vh">
    <table class="table table-sm table-hover">
      <thead>
        <tr>
          <th>Summa</th>
          <th>Sana</th>
          <th>
            <btn color="cyan" data-toggle="modal" data-target="#filter">
              <i class="fa fa-filter"></i>
            </btn>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data?.data" :key="item">
          <td>
            {{ _.format(item.money) + " " + item.currency.currency }}
          </td>
          <td>{{ item.time.replace("T", " ") }}</td>
          <td></td>
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

  <modal id="filter">
    <template #header>
      <h4>Filter</h4>
    </template>
    <template #body>
      <div class="row gap-1">
        <div class="col-12">
          <input
            type="date"
            color="green"
            class="form-control"
            v-model="from_time"
          />
        </div>
        <div class="col-12">
          <input
            type="date"
            color="green"
            class="form-control"
            v-model="to_time"
          />
        </div>
      </div>
    </template>
    <template #footer>
      <btn data-dismiss="modal" @click="get(0, 25)">
        <i class="far fa-circle-check"></i>
      </btn>
      <btn
        data-dismiss="modal"
        color="red"
        @click="
          from_time = '';
          to_time = '';
          get(0, 25);
        "
      >
        <i class="fa fa-trash"></i>
      </btn>
    </template>
  </modal>
</template>

<script>
import * as api from "../../utils/api";
import pagination from "@/components/pagination/pagination.vue";
export default {
  name: "tolovTarixi",
  components: { pagination },
  data() {
    return {
      _: Intl.NumberFormat(),
      data: null,
      from_time: "",
      to_time: "",
    };
  },
  created() {
    this.get(0, 25);
  },
  methods: {
    get(page, limit) {
      api
        .marketExpenses(
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
