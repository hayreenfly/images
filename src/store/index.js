import Vuex from "vuex";
import Vue from "vue";
import auth from "./modules/auth";

Vue.use(Vuex); //connects vue with vuex

export default new Vuex.Store({
  modules: {
    auth,
  },
});
