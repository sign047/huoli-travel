<!--swiper-->
<template>
   <div class="t-wrapper"  v-if="{{passportList.length > 0}}"  @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
        <div class="passport-item {{name[idx]}}" @longpress.stop="del" data-id="passport.id" data-index="idx" v-for="(passport,idx) in passportList" :key="idx" v-if="{{passportList.length > 0}}">
            <slot></slot>
        </div>
    </div>          
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      passportList: [],
      startTime: "",
      isGo: false,
      isLeft: true,
      isRight: true,
      showLoad: true,
      showCard: false,
      node: {
        x: 100,
        y: 100
      },
      name: [],
      count: 0
    };
  },

  components: {},

  computed: {
    passportList() {
      console.log(this.list);
      return this.list;
    }
  },

  mounted: {},

  methods: {
    toWrite: function() {
      if (!app.isLogin()) return;
      wx.navigateTo({
        url: "../addpassport/addpassport"
      });
    },
    throttle(delay, fn) {
      let ctx;
      let args;
      // 记录上次触发事件
      let previous = Date.now();

      let later = function() {
        fn.apply(ctx, args);
      };
      return function() {
        ctx = this;
        args = arguments;
        var now = Date.now();
        // 本次事件触发与上一次的时间比较
        var diff = now - previous - delay;

        // 如果隔间时间超过设定时间，即再次设置事件触发的定时器
        if (diff >= 0) {
          // 更新最近事件触发的时间
          previous = now;
          setTimeout(later, delay);
        }
      };
    },
    scrollLeft() {
      let len = this.data.passportList.length;
      if (!len) return;
      let count = this.data.count;
      if (len <= 2) {
        if (count <= 0) return;
      }
      this.changeName(2);
      let arr = this.data.name;
      count--;
      arr.unshift(arr.pop());
      this.setData({
        name: arr,
        count
      });
    },
    goPic() {
      wx.navigateTo({
        url: `../pic/pic`
      });
    },
    changeName(type) {
      let name = this.data.name;

      if (type === 1) {
        name = name.map((item, index) => {
          switch (item) {
            case "r1":
              item = "sr1";
              break;
            case "r2":
              item = "sr2";
              break;
            case "sl1":
              item = "l1";
              break;
            case "sl2":
              item = "l2";
              break;
          }
          return item;
        });
        this.setData({
          name
        });
      }
      if (type === 2) {
        name = name.map((item, index) => {
          switch (item) {
            case "l1":
              item = "sl1";
              break;
            case "l2":
              item = "sl2";
              break;
            case "sr1":
              item = "r1";
              break;
            case "sr2":
              item = "r2";
              break;
          }
          return item;
        });
        this.setData({
          name
        });
      }
    },
    scrollRight() {
      let len = this.data.passportList.length;
      if (!len) return;
      let count = this.data.count;
      if (len <= 2) {
        if (count > 0) return;
      }
      this.changeName(1);

      let arr = this.data.name;
      arr.push(arr.shift());
      count++;
      this.setData({
        name: arr,
        count
      });
    },
    //触摸开始事件
    touchstart: function(e) {
      const len = this.data.passportList.length;
      if (len <= 0) return;
      this.data.touchDot = e.touches[0].pageX;
      if (this.start) return;
      this.start = true;
      var that = this;

      clearInterval(this.data.interval);
      this.data.interval = setInterval(() => {
        this.data.time += 1;
      }, 100);
    },
    //触摸移动事件
    touchmove: function(e) {
      if (!this.start) return;
      let touchMove = e.touches[0].pageX;
      let touchDot = this.data.touchDot;
      let time = this.data.time;

      //向左滑动
      if (touchMove - touchDot <= -30 && time < 8 && !this.data.done) {
        this.data.done = true;
        this.scrollLeft();
      }
      //向右滑动
      if (touchMove - touchDot >= 30 && time < 8 && !this.data.done) {
        this.data.done = true;
        this.scrollRight();
      }
    },
    //触摸结束事件
    touchend: function(e) {
      clearInterval(this.data.interval);
      this.data.time = 0;
      this.data.done = false;
      this.start = false;
    }
  }
};
</script>
<style lang='scss' scoped>

</style>