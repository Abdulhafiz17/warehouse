<template>
  <div class="responsive-y" style="max-height: 75vh">
    <div class="table-responsive">
      <table class="table table-sm table-hover">
        <thead>
          <tr>
            <th>Partiya</th>
            <th>Kategoriya</th>
            <th>Brend</th>
            <th>Nomi</th>
            <th>Miqdor</th>
            <th>Narx</th>
            <th>Summa</th>
            <th>
              <btn color="cyan" data-toggle="modal" data-target="#filter">
                <i class="fa fa-filter"></i>
              </btn>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data?.data" :key="item">
            <td>{{ item.party.id }}</td>
            <td>{{ item.brand.category.name }}</td>
            <td>{{ item.brand.name }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.quantity + " dona" }}</td>
            <td>{{ _.format(item.price) + " " + item.currency.currency }}</td>
            <td>
              {{
                _.format(item.price * item.quantity) +
                " " +
                item.currency.currency
              }}
            </td>
            <td></td>
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

  <modal id="filter" size="sm">
    <template #header>
      <h4>Filter</h4>
    </template>
    <template #body>
      <div class="row gap-1">
        <div class="col-md-12">
          <div class="dropdown">
            <btn
              id="dropdownMenuButtonMarkets"
              type="button"
              block="true"
              class="dropdown-toggle"
              data-toggle="dropdown"
              @click="getParties()"
            >
              {{ party ? "Partiya id: " + party?.id : "Partiya" }}
            </btn>
            <div
              class="dropdown-menu w-100 mt-1"
              aria-labelledby="dropdownMenuButtonMarkets"
            >
              <ul
                class="responsive-y parties-scroll"
                style="max-height: 20vh"
                @scroll="scrollParties()"
              >
                <li
                  v-for="item in parties?.data"
                  :key="item"
                  @click="party = item"
                >
                  {{ "Partiya id: " + item.id }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <btn data-dismiss="modal" @click="get(0, 25)">
        <i class="far fa-circle-check"></i>
      </btn>
      <btn
        color="red"
        data-dismiss="modal"
        @click="
          party = null;
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
      let party_id = this.party ? this.party.id : 0;
      api.supplies(this.$route.params.id, party_id, page, limit).then((val) => {
        this.data = val;
      });
    },
    getParties() {
      api.parties(true, 0, 25).then((Response) => {
        this.parties = Response;
      });
    },
    scrollParties() {
      let div = document.querySelector(".parties-scroll");
      if (div.scrollTop + div.clientHeight >= div.scrollHeight) {
        if (this.parties?.current_page < this.parties?.pages - 1) {
          api
            .parties(true, this.parties?.current_page + 1, 25)
            .then((Response) => {
              this.parties.current_page = Response.current_page;
              this.parties.data = this.parties?.data.concat(Response.data);
            });
        }
      }
    },
  },
};
</script>
