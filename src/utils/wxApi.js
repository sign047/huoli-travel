function wxPromisify(fn) {
  return function(
    obj = {
      err: {}
    }
  ) {
    return new Promise((resolve, reject) => {
      obj.success = function(res) {
        //成功
        resolve(res);
      };
      obj.fail = function(res) {
        //失败
        if (obj.err) {
          reject(obj.err);
        } else {
          reject(res);
        }
      };
      fn(obj);
    });
  };
}
//无论promise对象最后状态如何都会执行
Promise.prototype.finally = function(callback) {
  let P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason =>
      P.resolve(callback()).then(() => {
        throw reason;
      })
  );
};

/**
 * 微信用户登录,获取code
 */
function wxLogin() {
  let wxLogin = wxPromisify(wx.login);
  return wxLogin({
    err: {
      code: 1000,
      title: "调用登录失败",
      content: "请下拉刷新重试！"
    }
  });
}
/**
 * 获取微信用户信息
 * 注意:须在登录之后调用
 */
function wxGetUserInfo(data) {
  return wxPromisify(wx.getUserInfo);
}
/**
 * 获取系统信息
 */
function wxGetSystemInfo(data) {
  return wxPromisify(wx.getSystemInfo);
}

function wxGetSetting(data) {
  var getSetting = wxPromisify(wx.getSetting);
  return getSetting(data);
}

function wxLoading(data) {
  var setLoading = wxPromisify(wx.showLoading);
  return setLoading(data);
}

function wxUserInfo(data) {
  var userInfo = wxPromisify(wx.getUserInfo);
  return userInfo({
    err: {
      code: 1001,
      title: "授权失败",
      content: "您不小心拒绝了微信授权！请允许我们获取您的基础信息才能正常使用"
    }
  });
}

function wxAuthorize(data) {
  var authorize = wxPromisify(wx.authorize);
  return authorize(data);
}

function wxShowModal(data) {
  var showModal = wxPromisify(wx.showModal);
  return showModal(data);
}

function wxOpenSetting() {
  return wxPromisify(wx.openSetting);
}

function wxShowActionSheet(data) {
  var showActionSheet = wxPromisify(wx.showActionSheet);
  return showActionSheet(data);
}

function wxChooseImage(data) {
  var chooseImage = wxPromisify(wx.chooseImage);
  return chooseImage(data);
}

function wxUploadFile(data) {
  var uploadFile = wxPromisify(wx.uploadFile);
  return uploadFile(data);
}

function setStorageSync(key, value) {
  wx.setStorageSync(key, value);
}

function getStorageSync(key) {
  wx.getStorageSync(key);
}

function appLogin() {
  let Login = wxLogin();
  Login()
    .then(res => {
      const code = res.code;
      return Promise.resolve(code);
    })
    .catch(res => {
      wx.showModel({
        title: "调用登录失败",
        content: "请下拉刷新重试！",
        showCancel: false
      });
    });
}

function wxUser() {
  wxLogin()
    .catch(res => {
      that.showModel({
        title: "调用登录失败",
        content: "请下拉刷新重试！",
        showCancel: false
      });
    })
    .then(res => {
      const code = res.code;
      if (code) {
        that.globalData.code = code;
      }
      wx.hideToast();
      return wxApi.wxUserInfo({
        withCredentials: true
      });
    })
    .catch(res => {
      cb &&
        cb({
          showLoad: false
        });
      that.showModel({
        title: "授权失败",
        content:
          "您不小心拒绝了微信授权！请允许我们获取您的基础信息才能正常使用",
        showCancel: false
      });
      wx.hideToast();
      return Promise.reject();
    })
    // userInfo
    .then(res => {
      encryptedData = res.encryptedData;
      iv = res.iv;
      var url = this.globalData.huoLiBase + "loginfo",
        code = that.globalData.code;

      // wx.showToast({
      //     title: '加载中',
      //     icon: 'loading',
      //     duration: 10000,
      //     mask:true
      // });
      wxRequest
        .getRequest(url, {
          encryptedData,
          iv,
          code
        })
        .then(res => {
          var data = res.data;

          if (res.statusCode >= 400) {
            that.showModel({
              content: "服务器出错,请下拉刷新重试",
              showCancel: false
            });
            wx.hideToast();
            return;
          }
          if (data.code == 200) {
            wx.hideToast();
            wx.setStorage({
              key: "authToken",
              data: data.object.authToken
            });
            that.globalData.authToken = data.object.authToken;
            if (!that.hasPhone()) {
              wx.setStorageSync("hasPhone", data.object.phone);
              that.globalData.hasPhone = data.object.phone;
            }
            setTimeout(() => {
              cb && cb();
            }, 0);
          } else {
            that.showModel({
              content: data.content,
              showCancel: false
            });
            wx.hideToast();
          }
        })
        .catch(res => {
          wx.hideToast();
          that.showModel({
            title: "数据获取失败",
            content: "请检查网络后刷新！",
            showCancel: false
          });
        });
    });
}

export {
  appLogin,
  wxUser,
  getStorageSync,
  setStorageSync,
  wxPromisify,
  wxLogin,
  wxGetUserInfo,
  wxGetSystemInfo,
  wxLoading,
  wxShowModal,
  wxOpenSetting,
  wxShowActionSheet,
  wxChooseImage,
  wxUploadFile,
  wxGetSetting,
  wxAuthorize,
  wxUserInfo
};
