<template>
  <div class="col-12">
    <card color="green">
      <div class="row gap-1">
        <div class="col-12 text-start">
          <h4>Mahsulotlar</h4>
          <hr />
        </div>

        <div class="col-12">
          <div class="row">
            <div class="col-md-5">
              <input
                type="date"
                color="green"
                class="form-control"
                v-model="from_time"
              />
            </div>
            <div class="col-md-5">
              <input
                type="date"
                color="green"
                class="form-control"
                v-model="to_time"
              />
            </div>
            <div class="col-md-2">
              <btn block="true" @click="getProductStatistic()">
                <i class="fa fa-search"></i>
              </btn>
            </div>
          </div>
        </div>

        <div class="col-12">
          <div id="mahsulot"></div>
        </div>
      </div>
    </card>
  </div>
</template>

<script>
import * as api from "../../utils/api";
export default {
  name: "mahsulotChart",
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
      limit: null,
      products: [],
      data: [],
      labels: [],
      backgrounds: [],
      borders: [],
    };
  },
  created() {},
  methods: {
    getProductStatistic() {
      api.productStatistic(this.from_time, this.to_time, 10).then((val) => {
        this.products = val;
        this.prepareChart();
      });
    },
    prepareChart() {
      this.data = [];
      this.labels = [];
      this.backgrounds = [];
      this.borders = [];
      let div = document.querySelector("#mahsulot");
      while (div.firstChild) {
        div.firstChild.remove();
      }
      let canvas = document.createElement("canvas");
      canvas.id = "mahsulotChart";
      div.append(canvas);
      this.products.forEach((item) => {
        this.data.push(item.sum_quantity);
        this.labels.push(
          item.Trades.warehouse_product.brand.category.name +
            " " +
            item.Trades.warehouse_product.brand.name +
            " " +
            item.Trades.warehouse_product.name
        );
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        this.backgrounds.push(`rgba(${r}, ${g}, ${b}, 0.3)`);
        this.borders.push(`rgb(${r}, ${g}, ${b})`);
      });
      let data = {
        labels: this.labels,
        datasets: [
          {
            label: "dona",
            data: this.data,
            backgroundColor: this.backgrounds,
            borderColor: this.borders,
            borderWidth: 1,
          },
        ],
      };
      this.createChart(data);
    },
    createChart(data) {
      new Chart(document.getElementById("mahsulotChart").getContext("2d"), {
        type: "bar",
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    },
  },
};
</script>
