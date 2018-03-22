<!-- login -->
<template>
  <div>
      <div class="align login">
  <div class="weui-toptips weui-toptips_warn" v-if="showTopTips">{{errTxt}}</div>
  <span class="txt">绑定手机号</span>
  <span class="txt">通过短信接收护照到期提醒</span>
  <div class="codebox">
      <div class="top">
          <div >
              <input type="number"
                     placeholder-style="color:#c3c3c3"
                     @input="getPhone"
                     class="phone"
                     placeholder="手机号码"/>
          </div>

      </div>
      <div class="flexbox between">
          <!--<span>验证码</span>-->
          <input type="number"
                 bindinput="setCode"
                 placeholder-style="color:#c3c3c3"
                 class="phone"
                 placeholder="验证码"/>
          <span @tap="getCode" v-if="second<=0" class="code">获取验证码</span>
          <span v-if="second > 0" class="code codegrey">{{second}}</span>
      </div>
  </div>
  <div class="btnbox">
      <span class="btn medium blue-btn" :class="{grey:!verifyCode|| !phone}" @tap.stop="login">登录</span>
  </div>
</div>
  </div>
</template>

<script>
import { savePhone } from "@/api/api";
export default {
  data() {
    return {
      phone: "",
      isCode: false,
      verifyCode: "",
      second: 0,
      id: "",
      showTopTips: false,
      errTxt: ""
    };
  },

  components: {},

  computed: {},

  mounted: {},

  methods: {
    login: function() {
      var data = this.data;
      if (!data.verifyCode || data.verifyCode.length < 4) {
        this.showTopTips("请输入正确的4位验证码");
        return;
      }
      var json = {
        phone: data.phone,
        smsCode: data.verifyCode,
        authToken: app.globalData.authToken
      };

      var id = data.id;
      savePhone(json).then(res => {
        wx.switchTab({
          url: "../passportList/passportList"
        });
      });
    },
    getPhone: function(e) {
      var val = e.detail.value;
      this.setData({
        phone: val
      });
    },
    setCode: function(e) {
      var val = e.detail.value;
      this.setData({
        verifyCode: val
      });
    },
    showTopTips: function(errmsg) {
      var that = this;
      this.setData({
        showTopTips: true,
        errTxt: errmsg
      });
      setTimeout(function() {
        that.setData({
          showTopTips: false
        });
      }, 2400);
    },
    getCode: function() {
      var self = this;
      var url = app.globalData.huoLiBase + "sendLoginSms";
      var mobile = /^0?(13|15|18|14|17)[0-9]{9}$/;
      var phone = this.data.phone;
      if (!mobile.test(phone)) {
        self.showTopTips("手机号格式错误");
        return;
      }
      if (this.data.second > 0) return;
      this.setData({
        second: 60
      });
      this.timeTick();
      util.http(url, { phone: phone }, function(res) {});
    },
    timeTick: function() {
      var self = this;
      setTimeout(function() {
        if (self.data.second > 0) {
          var second = self.data.second;
          second--;
          self.setData({
            second: second
          });
          self.timeTick();
        }
      }, 1000);
    }
  }
};
</script>
<style lang='scss' scoped>
.login {
  padding: 80rpx 40rpx 0;
}

.login .txt {
  color: #a8a7b6;
  font-size: 30rpx;
}
.codebox {
  border-radius: 16rpx;
  background: #fff;
  width: 100%;

  box-sizing: border-box;
  margin-top: 6rpx;
  margin-bottom: 280rpx;
}
.codebox input {
  font-size: 32rpx;
  padding-left: 20rpx;
  color: #333;
}
.codebox text {
  font-size: 28rpx;
  color: #485465;
  margin-top: 34rpx;
  display: block;
  margin-bottom: 30rpx;
}
.codebox > .between {
  border-bottom: 1rpx solid #f0f0f0;
}
page {
  background: #fff;
}
.top {
  border-bottom: 1rpx solid #f0f0f0;
  padding: 0 !important;
}
.code {
  background: #f0f0f0;
  border-radius: 12rpx;
  font-size: 24rpx !important;
  width: 152rpx !important;
  height: 60rpx !important;
  line-height: 60rpx !important;
  display: block;
  margin: 0 !important;
  color: #333 !important;
  text-align: center;
}
.codegrey {
  background: #ccc;
}
.phone {
  padding-bottom: 20rpx;
  padding-top: 40rpx;
}

.weui-toptips {
  position: fixed;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  top: 0;
  left: 0;
  right: 0;
  padding: 0 5px;
  box-sizing: border-box;
  height: 60rpx;
  line-height: 60rpx;
  font-size: 26rpx;
  text-align: center;
  color: #fff;
  z-index: 5000;
  word-wrap: break-word;
  word-break: break-all;
}
.weui-toptips_warn {
  background-color: #e64340;
}
.btnbox {
  position: relative;
}
.mask {
  background: #cbcbcb;
  position: absolute;
  width: 100%;
  color: #fff;
  z-index: 2;
  left: 0;
  top: 0;
  display: block;
  font-size: 30rpx;
  border-radius: 10rpx;
  height: 100%;
  text-align: center;
  line-height: 3;
}
.blue-btn {
  background: #5599f5;
}
.grey {
  background: #cbcbcb;
}
</style>