import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";
import store from "./store";
import AuthHandler from "./components/AuthHandler.vue";
import ImageList from "./components/ImageList.vue";
import UploadForm from "./components/UploadForm.vue";
import LogoutScreen from "./components/LogoutScreen.vue";

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: AuthHandler },
    { path: "/galleries", component: ImageList },
    { path: "/upload", component: UploadForm },
    { path: "/logout", component: LogoutScreen },
  ],
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
