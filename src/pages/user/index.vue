<!-- user -->
<template>
   <div class="user-wrapper">
    <div class="avatar flex between align-normal">
     <span class="nickName medium">{{nickName}}</span>
    <image :src="avatarUrl"></image>
    </div>
    <div class="flexbox user" catchtap="toPhone">
        <span class="medium">手机号</span>
        <div class="flex right-txt between">
            <span class="phone-txt">{{phoneTxt}}</span>
        </div>
    </div>
    <div class="flexbox between user" catchtap="toFeedBack">
        <span class="medium">意见反馈</span>
    </div>
     <div class="flexbox user" catchtap="toVisaFiles">
        <span class='medium red-tip'>签证资料夹</span>
         <div class="flexbox">
            <span class="phone-txt ">一次上传，永久存档，再也不用重复整理</span>
        </div>
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      phone: "",
      isCode: false,
      verifyCode: "",
      second: 0,
      path: "",
      phoneTxt: "绑定手机开启护照到期短信提醒功能",
      oldPhone: "",
      avatarUrl: "http://7xj7u1.com1.z0.glb.clouddn.com/passport/user.png",
      nickName: "如刀似剑"
    };
  },

  components: {},
  computed: {},
  methods: {
    toVisaFiles() {
      wx.switchTab({
        url: "../addVisaData/addVisaData"
      });
    },
    getPhone: function() {
      var that = this;
      var hasPhone = app.globalData.hasPhone;
      var url = app.globalData.huoLiBase + "getPhone";
      var phone = wx.getStorageSync("hasPhone");
      const authToken = app.globalData.authToken;
      if (hasPhone === null || hasPhone == 0) {
        this.setData({
          phoneTxt: "绑定手机开启护照到期短信提醒功能"
        });
      } else {
        if (authToken === null || !authToken) return;
        util.http(url, { authToken: authToken }, function(res) {
          if (res.object === null) return;
          var phone = that.maskNum(res.object);
          var txt = res.object;
          that.setData({
            phoneTxt: phone,
            oldPhone: phone,
            phone: txt
          });
        });
      }
    },
    maskNum: function(num) {
      return num.replace(/\d{11}/g, function(s) {
        return s.substring(0, 3) + "****" + s.substring(7);
      });
    },
    toPhone: function() {
      const hasPhone = app.globalData.hasPhone;
      const authToken = app.globalData.authToken;
      if (authToken === null || !authToken) return;
      var phone = this.data.phone;
      if (hasPhone === null || hasPhone == 0) {
        wx.navigateTo({
          url: "../login/login"
        });
      } else {
        wx.navigateTo({
          url: "../changePhone/changePhone?phone=" + phone
        });
      }
    },
    toFeedBack: function() {
      const hasPhone = app.globalData.hasPhone;
      const authToken = app.globalData.authToken;
      if (authToken === null || !authToken) return;
      wx.navigateTo({
        url: "../feedBack/feedBack"
      });
    }
  }
};
</script>
<style lang='scss' scoped>
page {
  background: #fdfdfd;
}
.radius {
  color: #a4b0c0;
  margin-right: -44rpx;
  height: 24rpx;
  width: 14rpx;
  display: block;
}
.user {
  margin-bottom: 66rpx;
}
.user .medium {
  color: #000;
  font-size: 32rpx;
  line-height: 44rpx;
  display: block;
}
.right-txt {
  flex: 1;
  margin-left: 80rpx;
}
.user .phone-txt {
  color: #bfbfbf;
  font-size: 24rpx;
  text-align: left;
  line-height: 34rpx;
  display: block;
}
.user-wrapper {
  padding: 60rpx 62rpx 0;
}
.avatar {
  margin-bottom: 80rpx;
}
.avatar image {
  height: 190rpx;
  width: 190rpx;
  display: block;
  border-radius: 50%;
}
.avatar text {
  color: #000;
  font-size: 60rpx;
  line-height: 84rpx;
}
.red-tip {
  position: relative;
  margin-right: 28rpx;
}
.red-tip::after {
  content: "";
  position: absolute;
  top: -4rpx;
  right: -12rpx;
  height: 12rpx;
  width: 12rpx;
  border-radius: 50%;
}
</style>