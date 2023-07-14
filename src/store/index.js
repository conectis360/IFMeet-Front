import { createStore } from "vuex";
import { auth } from "./auth.module";

const store = createStore({
  state () {
    return {
      loading: false,
    }
  },
  modules: {
    auth,
  },
  mutations: {
    loadingTrue (state) {
      state.loading = true
    },
    loadingFalse (state) {
      state.loading = false
    }
  }
});

export default store;