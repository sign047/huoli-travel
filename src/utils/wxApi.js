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
