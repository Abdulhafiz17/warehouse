<template></template>

<script>
export default {
  name: "home",
  data() {
    return {
      role: localStorage["role"],
    };
  },
  created() {
    if (this.role == "admin") this.$router.push("/main");
  },
};
</script>
