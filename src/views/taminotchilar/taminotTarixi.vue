<template>
  <div class="responsive-y" style="max-height: 75vh">
    <div class="table-responsive">
      <table class="table table-sm table-hover">
        <thead>
          <tr>
            <th>Kategoriya</th>
            <th>Brend</th>
            <th>Miqdor</th>
            <th>Narx</th>
            <th>Summa</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data?.data" :key="item">
            <td>{{ item.brand.category.name }}</td>
            <td>{{ item.brand.name }}</td>
            <td>{{ item.quantity + " dona" }}</td>
            <td>{{ _.format(item.price) + " " + item.currency.currency }}</td>
            <td>
              {{
                _.format(item.price * item.quantity) +
                " " +
                item.currency.currency
              }}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="7">
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
  name: "taminotTarixi",
  components: { pagination },
  data() {
    return {
      _: Intl.NumberFormat(),
      parties: null,
      party: null,
      warehouses: [],
      warehouse: null,
      data: null,
    };
  },
  created() {
    this.get(0, 25);
  },
  methods: {
    get(page, limit) {
      api.supplies(this.$route.params.id, 0, 0, page, limit).then((val) => {
        this.data = val;
      });
    },
  },
};
</script>
