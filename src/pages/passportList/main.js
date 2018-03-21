import Vue from "vue";
import App from "./index";
import store from "@/store/index";
const app = new Vue(App);
app.$mount();

export default {
  config: {
    navigationBarTitleText: "护照管家",
    navigationBarBackgroundColor: "#fff"
  }
};
