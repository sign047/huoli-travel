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
    pages: [
      "pages/passportList/passportList",
      "pages/login/login",
      "pages/pic/pic",
      "pages/user/user",
      "^pages/visaDataList/visaDataList"
    ],
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会webpack entry 里面的入口页面加进去
    tabBar: {
      color: "#cacaca",
      selectedColor: "#000",
      backgroundColor: "#fff",
      borderStyle: "#fff",
      position: "bottom",
      list: [
        {
          pagePath: "pages/passportList/passportList",
          text: "护照",
          iconPath: "/static/images/r-grey.png",
          selectedIconPath: "/static/images/r-black.png"
        },
        {
          pagePath: "pages/visaDataList/visaDataList",
          iconPath: "/static/images/l-grey.png",
          selectedIconPath: "/static/images/l-black.png",
          text: "资料夹"
        },
        {
          pagePath: "pages/user/user",
          text: "我的",
          iconPath: "/static/images/c-grey.png",
          selectedIconPath: "/static/images/c-black.png"
        }
      ]
    },
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
