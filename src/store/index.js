import Vue from "vue";
import Vuex from "vuex";
import app from "./modules/app";
import user from "./modules/user";
import visaFile from "./modules/visaFile";
import permission from "./modules/permission";
import getters from "./getters";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    visaFile,
    app,
    user,
    permission
  },
  getters
});

export default store;
