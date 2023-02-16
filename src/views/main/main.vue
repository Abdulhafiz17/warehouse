<template>
  <div class="row">
    <div class="col-md-3 mb-1" v-for="item in links" :key="item">
      <router-link :to="item.path">
        <card color="green">
          <i class="fa fa-2x" :class="item.icon"></i>
          <hr />
          {{ item.title }}
        </card>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      links: [
        { path: "/omborlar", icon: "fa-warehouse", title: "Omborlar" },
        {
          path: "/taminotlar",
          icon: "fa-truck",
          title: "Ta'minotlar",
        },
        {
          path: "/taminotchilar",
          icon: "fa-truck-loading",
          title: "Ta'minotchilar",
        },
        // {
        //   path: "/mijozlar",
        //   icon: "fa-handshake",
        //   title: "Mijozlar",
        // },
        {
          path: "/hodimlar",
          icon: "fa-users",
          title: "Hodimlar",
        },
        {
          path: "/setting",
          icon: "fa-tools",
          title: "Sozlamalar",
        },
      ],
    };
  },
};
</script>

<style scoped></style>
