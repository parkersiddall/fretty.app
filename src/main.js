import Vue from "vue";
import App from "./App.vue";
import "./assets/scss/app.scss";

Vue.config.productionTip = false;

window.onload = function () {
  new Vue({
    render: (h) => h(App),
  }).$mount("#app");
};
