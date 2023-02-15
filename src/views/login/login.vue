<template>
  <div class="container-fluid">
    <card color="green" class="w-25">
      <Logo />
      <form @submit.prevent="login()">
        <div class="row my-2 gap-2">
          <div class="col-12">
            <input
              type="text"
              class="form-control text-center"
              placeholder="username"
              required
              color="green"
              v-model="username"
            />
          </div>
          <div class="col-12">
            <input
              type="password"
              class="form-control text-center"
              placeholder="password"
              required
              color="green"
              v-model="password"
            />
          </div>
          <div class="col-12">
            <btn color="green" class="w-100">Kirish</btn>
          </div>
        </div>
      </form>
    </card>
  </div>
</template>

<script>
import Logo from "../../components/logo/crudlogo.vue";
import * as api from "../../utils/api";
export default {
  name: "login",
  components: { Logo },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  created() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    console.clear();
  },
  methods: {
    login() {
      api
        .token({ username: this.username, password: this.password })
        .then((val) => {
          localStorage["token"] = val.access_token;
          localStorage["role"] = val.role;
          location.href = "/home";
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.container-fluid {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 30px);
}
</style>
