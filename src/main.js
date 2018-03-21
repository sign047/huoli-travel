import Vue from "vue";
import App from "./App";
import Vuex from "vuex";
import store from "@/store/index";
Vue.config.productionTip = false;
App.mpType = "app";
Vue.use(Vuex);
Vue.prototype.$store = store;
const app = new Vue(store, ...App);
app.$mount();

export default {
  // 这个字段走 app.json
  config: {
    pages: ["^pages/passportList/passportList", "pages/pic/pic"],
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会webpack entry 里面的入口页面加进去
    window: {
      navigationBarTitleText: "护照管家",
      navigationBarBackgroundColor: "#fff",
      navigationBarTextStyle: "black"
    },
    networkTimeout: {
      request: 10000,
      connectSocket: 10000,
      uploadFile: 10000,
      downloadFile: 10000
    }
  }
};
