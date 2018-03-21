<template>
  <div class="align passport-list">
    <hLoad v-if="showLoginLoading" ></hLoad>
    <image class="add-btn" v-if="passportList.length !== 0" @tap="toAddchoice" src="http://7xl2r0.com1.z0.glb.clouddn.com/passport/add-icon.png"></image>
    <div class="no-visa" v-if="passportList.length === 0">
        <button @getuserinfo="toPhoto" data-type="1" class="noVisa-button" open-type="getUserInfo" data-index="0"></button>
        <img class="photo" src="http://7xl2r0.com1.z0.glb.clouddn.com/passport/50054719619748947.png">
        <div class="point flexbox">
            <text># 护照随身携带</text>
            <text># 全家护照共享</text>
            <text># 护照到期提醒</text>
        </div>
    </div>
  </div>
</template>
<script>
import * as util from "@/utils/util";
import { getPassportList, delPassport } from "@/api/api";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import hLoad from "@/components/h-load";
import { wxUserInfo, wxLogin } from "@/utils/wxApi";
import Tip from "@/utils/tip";
export default {
  name: "passportList",
  components: { hLoad },
  data() {
    return {
      passportList: [],
      startTime: "",
      isGo: false,
      isLeft: true,
      isRight: true,
      showCard: false,
      name: [],
      count: 0,
      pageType: "passport"
    };
  },
  beforeMount() {
    const query = this.$root.$mp.query;
  },
  created() {
    this.GetAuthToken();
  },
  computed: {
    ...mapGetters(["isLogin", "hasPhone", "showLoginLoading", "authToken"])
  },
  methods: {
    ...mapActions({
      GetAuthToken: "GetAuthToken",
      GetUserInfo: "GetUserInfo"
    }),
    ...mapMutations({
      setCode: "SET_CODE"
    }),
    toPhoto() {
      if (this.isLogin) {
        wx.navigateTo({
          url: "../pic/pic",
          success: function(res) {
            // success
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        });
      } else {
        this.GetAuthToken().then(() => {});
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.blue-circle {
  background: url("http://7xl2r0.com1.z0.glb.clouddn.com/passport/list-ng.png")
    no-repeat;
  height: 384rpx;
  width: 172rpx;
  background-size: 172rpx 384rpx;
  position: fixed;
  right: 0;
  top: 4rpx;
}
.s-circle {
  position: fixed;
  width: 102rpx;
  height: 102rpx;
  border-radius: 50%;
  background: #94d3ff;
  bottom: 12rpx;
  left: -51rpx;
}
.sm-circle {
  width: 26rpx;
  height: 26rpx;
  background: #94d3ff;
  position: fixed;
  bottom: 146rpx;
  left: 40rpx;
  border-radius: 50%;
}
.t-wrapper {
  position: relative;
  margin-top: 148rpx;
  width: 100%;
  height: 850rpx;
}
.passport-list {
  width: 100%;
  height: 100vh;
  background: #fdfdfd;
  overflow: hidden;
  position: fixed;
}
.passport-item {
  position: absolute;
  width: 520rpx;
  border-radius: 26rpx;
  background: #fff;
  top: 0;
  left: 50%;
  margin-left: -260rpx;
  opacity: 0;
  box-shadow: 0 18rpx 56rpx rgba(0, 0, 0, 0.12);
}
.passport-box {
  box-sizing: border-box;
  padding: 116rpx 90rpx 10rpx;
  position: relative;
  overflow: hidden;
}
.coupon-img {
  height: 190rpx;
  width: 190rpx;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  top: -95rpx;
  z-index: 20;
  box-shadow: 0 18rpx 56rpx 2rpx rgba(0, 0, 0, 0.12);
}
.center {
  width: 100%;
}
.info-new {
  color: #333;
  font-size: 32rpx;
  margin-bottom: 18rpx;
  line-height: 44rpx;
}

.info-name {
  color: #999;
  font-size: 20rpx;
  line-height: 28rpx;
  width: 260rpx;
}
.visaTip {
  width: 100%;
  background: #94d3ff;
  color: #fff;
  font-size: 32rpx;
  text-align: center;
  padding: 24rpx 0;
  border-radius: 0 0 26rpx 26rpx;
  text-shadow: 0 2rpx 6rpx rgba(70, 162, 227, 0.8);
  position: relative;
}
.max-box {
  overflow: hidden;
  width: 140rpx;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.visaTip image {
  display: block;
  height: 32rpx;
  width: 32rpx;
  position: absolute;
  top: 50%;
  right: 36rpx;
  transform: translate3d(0, -50%, 0);
}
/*轮播*/
.passport-item.l2,
.passport-item.sl2 {
  opacity: 0;
  transform: perspective(800px) translate3d(-200%, 0, 0);
  z-index: 1;
  visibility: visible;
}
.passport-item.l1,
.passport-item.sl1 {
  opacity: 0.8;
  transform: perspective(800px) translate3d(-100%, 0, 0) scale3d(0.8, 0.8, 0.8);
  z-index: 2;
  visibility: visible;
}

.passport-item.cur {
  opacity: 1;
  z-index: 5;
  transform: perspective(800px) scale3d(1, 1, 1);
  visibility: visible;
  transition: 0.3s transform linear;
}

.passport-item.r1,
.passport-item.sr1 {
  opacity: 0.8;
  transform: perspective(800px) translate3d(100%, 0, 0) scale3d(0.8, 0.8, 0.8);
  z-index: 2;
  visibility: visible;
}

.passport-item.r2,
.passport-item.sr2 {
  opacity: 0;
  transform: perspective(800px) translate3d(200%, 0, 0) translateX(750px);
  z-index: 1;
  visibility: visible;
}
.passport-item.sr1,
.passport-item.sr2,
.passport-item.sl2,
.passport-item.sl1 {
  transition: 0.24s all linear;
}
.line {
  border-top: 1rpx #ebebeb dotted;
  width: 520rpx;
  margin: 6rpx 0 32rpx;
}
/*no-visa*/
.no-visa {
  position: relative;
}
.noVisa-button {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
.photo {
  height: 470rpx;
  width: 450rpx;
  margin: 160rpx auto 160rpx;
  display: block;
}
.point {
  flex-wrap: wrap;
  margin-left: 106rpx;
}
.point text {
  background: #000;
  color: #fff;
  font-size: 30rpx;
  display: block;
  margin: 0 36rpx 36rpx 0;
  text-align: center;
  width: 248rpx;
  padding: 12rpx 0;
}

.shade {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 10086;
  visibility: hidden;
  opacity: 0;
}
.icon-img {
  height: 48rpx;
  width: 48rpx;
}
.shade-content {
  background: #fff;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 272rpx;
  transform: translate3d(0, 100%, 0);
  transition: all ease 0.2s;
  z-index: 10086222;
}
.show {
  transition: all ease 0.2s;
  opacity: 1;
  visibility: visible;
}
.show .shade-content {
  transition: all ease 0.2s;
  transform: translate3d(0, 0, 0);
}
.shade-content2 {
  transition: all ease 0.2s;
  transform: translate3d(0, 0, 0);
}
.icon-txt {
  color: #000;
  font-size: 26rpx;
  line-height: 36rpx;
  margin-top: 20rpx;
}
.icon-box {
  width: 100%;
}
.add-txt {
  color: #000;
  font-size: 26rpx;
  line-height: 36rpx;
  margin: 40rpx 0 46rpx;
}
.outtime {
  border-radius: 8rpx;
  background: #000;
  color: #fff;
  height: 44rpx;
  width: 210rpx;
  font-size: 24rpx;
  line-height: 44rpx;
  text-align: center;
}
.last-time {
  position: absolute;
  right: -50rpx;
  top: 50%;
  transform: translate3d(0, -50%, 0);
}
.add-btn {
  position: fixed;
  bottom: 2rpx;
  right: 22rpx;
  width: 128rpx;
  height: 128rpx;
  z-index: 22222;
}
.red-tip {
  position: relative;
  margin-right: 28rpx;
}
.red-tip::after {
  content: "";
  position: absolute;
  top: -4rpx;
  height: 12rpx;
  width: 12rpx;
  background: #f53424;
  border-radius: 50%;
}
</style>

