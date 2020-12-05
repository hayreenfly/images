// import api from "../../api/imgur";
import api from "../../api/google";
import qs from "qs";
import { router } from "../../main";

const state = {
  token: window.localStorage.getItem("google_token"),
};

const getters = {
  isLoggedIn: (state) => !!state.token,
};

const actions = {
  login: () => {
    api.login();
  },
  finalizeLogin({ commit }, hash) {
    const query = qs.parse(hash.replace("#", ""));

    commit("setToken", query.access_token);
    window.localStorage.setItem("google_token", query.access_token);

    router.push("/galleries");
  },
  logout: ({ commit }) => {
    commit("setToken", null);
    window.localStorage.removeItem("google_token");
    router.push("/logout");
  },
};

const mutations = {
  setToken: (state, token) => {
    state.token = token;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
