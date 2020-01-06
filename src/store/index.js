import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    user: state => state.user
  },
  mutations: {
    SET_CURRENT_USER(state, user) {
      state.user = user;
    }
  },
  actions: {},
  modules: {}
});
