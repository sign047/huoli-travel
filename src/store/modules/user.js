import {
  getStorageSync,
  setStorageSync,
  wxLogin,
  wxUserInfo
} from "@/utils/wxApi";
import Tip from "@/utils/tip";
import { getLoginfo } from "@/api/api";

let token = getStorageSync("authToken");
const user = {
  state: {
    authToken: getStorageSync("authToken"),
    phone: getStorageSync("phone"),
    showLoginLoading: true
  },
  getters: {
    isLogin: state => {
      let authToken = state.authToken;
      if (authToken == null || authToken == undefined || !authToken) {
        return false;
      } else {
        return true;
      }
    },
    hasPhone: state => {
      return state.phoneFlag;
    },
    showLoginLoading: state => {
      return state.showLoginLoading;
    },
    authToken: state => {
      return state.authToken;
    }
  },
  mutations: {
    SET_CODE: (state, code) => {
      state.code = code;
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction;
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting;
    },
    SET_STATUS: (state, status) => {
      state.status = status;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_TOKEN: (state, authToken) => {
      setStorageSync("authToken", authToken);
      state.authToken = authToken;
    },
    SET_LOGIN_LOADING: (state, load) => {
      state.showLoginLoading = load;
    },
    SET_PHONE_FLAG: (state, flag) => {
      flag = Number(flag);
      if (flag == 1) {
        flag = true;
      } else if (flag == 0) {
        flag = false;
      } else {
        flag = false;
      }
      state.phoneFlag = flag;
    }
  },

  actions: {
    //login
    GetUserInfo({ dispatch, commit, state }, params) {
      commit("SET_LOGIN_LOADING", true);
      return new Promise((resolve, reject) => {
        wxLogin()
          .then(res => {
            commit("SET_CODE", res.code);
            return wxUserInfo();
          })
          .then(res => {
            let { nickName, avatarUrl, gender } = res.userInfo;
            commit("SET_NAME", nickName);
            commit("SET_AVATAR", avatarUrl);
            commit("SET_INTRODUCTION", gender);
            commit("SET_LOGIN_LOADING", false);
            resolve(res);
          })
          .catch(err => {
            commit("SET_LOGIN_LOADING", false);
            reject("aaaa");
            if (err.code && err.title) {
              Tip.confirm({
                text: err.content,
                showCancel: false,
                title: err.title
              });
            }
          });
      });
    },
    // 获取用户信息
    async GetAuthToken({ dispatch, commit, state }, params) {
      let userInfo = dispatch("GetUserInfo");
      userInfo.then(res => {
        let { encryptedData, iv } = res;
        let code = state.code;
        return new Promise((resolve, reject) => {
          getLoginfo({ encryptedData, iv, code })
            .then(res => {
              let { authToken, phone } = res.object;
              commit("SET_TOKEN", authToken);
              commit("SET_PHONE_FLAG", phone);
              resolve(res);
            })
            .catch(error => {
              reject(error);
            });
        });
      });
    }
  }
};

export default user;
