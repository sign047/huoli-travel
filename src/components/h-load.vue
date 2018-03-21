<!--  -->
<template>
    <div class="load" >
        <div class="mask" @click="sss">
            <img class="img" src="/static/images/i-loadloop.gif" alt="">
            <div class="p">{{title}}</div>
        </div>
        <slot></slot>
    </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "正在载入"
    }
  },
  data() {
    return {};
  },

  methods: {}
};
</script>
<style lang='scss' scoped>
/* template/load/load.wxss */
.load {
  position: fixed;
  height: 100vh;
  width: 750rpx;
  left: 0;
  top: 0;
  z-index: 222;
  background: rgba(255, 255, 255, 1);
  border-top: 1rpx solid #f9f9f9;
}
.mask {
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate3d(-50%, 0, 0);
  /* width:220rpx; */
  /* height:220rpx; */
  padding: 20rpx 51rpx;
  background: rgba(0, 0, 0, 1);
  border-radius: 10rpx;
}
.img {
  margin: 20rpx auto 0;
  display: block;
  width: 140rpx;
  height: 140rpx;
  border-radius: 50%;
}
.p {
  text-align: center;
  color: #fff;
  font-size: 28rpx;
  margin-top: 4rpx;
}
</style>