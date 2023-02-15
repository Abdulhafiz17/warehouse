<template>
  <div class="btn-group btn-group-sm my-1">
    <btn color="green" :disabled="page == 0" @click="get(0, limit)">
      <i class="fa fa-angle-double-left"></i>
    </btn>
    <btn color="green" :disabled="page == 0" @click="get(page - 1, limit)">
      <i class="fa fa-angle-left"></i>
    </btn>
    <btn color="green" v-if="page - 1 > 0" @click="get(page - 2, limit)">
      {{ page - 1 }}
    </btn>
    <btn color="green" v-if="page" @click="get(page - 1, limit)">
      {{ page }}
    </btn>
    <btn color="green">{{ page + 1 }}</btn>
    <btn color="green" v-if="page + 2 <= pages" @click="get(page + 1, limit)">
      {{ page + 2 }}
    </btn>
    <btn color="green" v-if="page + 3 <= pages" @click="get(page + 2, limit)">
      {{ page + 3 }}
    </btn>
    <btn
      color="green"
      :disabled="page == pages - 1 || !pages"
      @click="get(page + 1, limit)"
    >
      <i class="fa fa-angle-right"></i>
    </btn>
    <btn
      color="green"
      :disabled="page == pages - 1 || !pages"
      @click="get(pages - 1, limit)"
    >
      <i class="fa fa-angle-double-right"></i>
    </btn>
    <select
      color="green"
      class="form-select form-select-sm"
      v-model="limit1"
      @change="get(0, limit1)"
    >
      <option disabled value="">limit</option>
      <option value="25">25</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "pagination",
  props: {
    page: { default: 0 },
    pages: { default: 1 },
    limit: { default: 25 },
  },
  emits: ["get"],
  data() {
    return {
      limit1: this.$props.limit,
    };
  },
  methods: {
    get(page, limit) {
      this.$emit("get", page, limit);
    },
  },
};
</script>
