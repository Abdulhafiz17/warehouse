import { createStore } from "vuex";

export default createStore({
  state() {
    return { loading: false };
  },
  actions: {
    setloading(ctx, loading) {
      ctx.commit("setloading", loading);
    },
  },
  mutations: {
    setloading(state, loading) {
      state.loading = loading;
    },
  },
  getters: {
    loading(state) {
      return state.loading;
    },
  },
});
