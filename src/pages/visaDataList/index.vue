<!-- filelist -->
<template>
  <div class="addVisaData">
    <div class="data-box-tip align " :class="{hide:hideCard}">
        <span class='tit medium'>什么是签证资料夹？</span>
        <span class="medium">你知道吗？</span>
        <span class="medium">所有签证所需资料大同小异</span>
        <span class="medium">  可大多数人每次办签证都在重复整理，烦不胜烦</span>
        <span class="medium">为什么不一劳永逸，一次上传，永久存档呢？</span>
        <div class="flexbox v-end ">
          <div class="button flex" @tap="hideCardHandle">
              <icon color="#fff" type="success_no_circle" size="21"></icon>
              <span>我知道了</span>
          </div>
        </div>
    </div>
    <div class="showlist" :class="{up:hideCard}">
        <div class="flex add-btn  visa-data between">
            <button @getuserinfo="toNewFile"  class="noVisa-button" open-type="getUserInfo" ></button>
            <span class="medium" >添加新的签证资料</span> 
            <img src="http://7xl2r0.com1.z0.glb.clouddn.com/passport/553344276075716271.png">
        </div>
        <div class="flex visa-data between new-visa-data" @tap.stop="toEditFile" data-id="file.id" data-file="file" v-for="(file,index) in visaFiles" :key="file.id">
            <div class="align">
                <span class="medium p-name">{{file.visaFileUserName}}</span>
                <span class='visa-num'>护照{{file.visaFileDesc}}</span>
            </div>
            <span :class="[file.step === 3 ? ok : not]">{{file.step === 3 ? '已完成' : '待完善'}}</span>
        </div>
    </div>
</div>
</template>
<script>
import { getVisaVF, isCompare, saveFile } from "@/api/api";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { wxUserInfo, wxLogin } from "@/utils/wxApi";
import Tip from "@/utils/tip";
export default {
  data() {
    return {
      hideCard: false,
      visaFiles: []
    };
  },
  components: {},
  computed: {
    ...mapGetters(["isLogin", "hasPhone", "showLoginLoading", "authToken"])
  },
  created() {
    if (this.isLogin) {
    } else {
      console.log(this.getAuthToken());
      // this.GetAuthToken().then(res => {
      //   console.log(res);
      // });
    }
  },
  methods: {
    ...mapActions({
      getAuthToken: "GetAuthToken"
    }),
    hideCardHandle() {
      this.hideCard = true;
    },
    toEditFile(e) {
      let file = e.currentTarget.dataset.file;
      if (file.step == 3) {
        file.moveStep = 2;
      } else {
        file.moveStep = file.step;
      }
      app.globalData.currentFile = file;
      wx.navigateTo({
        url: `../dataProgress/dataProgress`
      });
    },
    inList(list, id) {
      for (let i = 0; i < list.length; i++) {
        let item = list[i];
        if (item.visaFileDesc == id) {
          return i;
        }
      }
      return false;
    },

    getVisaFiles(authToken) {
      const that = this;
      const num = app.globalData.currentNumber;

      util.http(url, { authToken }, function(res) {
        let visaFiles = res.object;
        visaFiles.sort((visa1, visa2) => {
          return visa2.createTime - visa1.createTime;
        });
        if (num && visaFiles !== undefined && visaFiles !== []) {
          let index = that.inList(visaFiles, num);
          if (index) {
            const catchItem = visaFiles[index];
            visaFiles[index] = visaFiles[0];
            visaFiles[0] = catchItem;
          }
        }
        that.setData({
          visaFiles
        });
      });
    },
    saveVisaFile() {
      const that = this;
      saveFile({ authToken }).then(() => {
        if (res.code == 200) {
          that.getVisaFiles();
        }
      });
    },
    isNeedSynchronize() {
      isCompare({ authToken }).then(res => {
        const flag = res.object.isNeedSynchronize;
        if (flag) {
          this.saveVisaFile(authToken);
        } else {
          this.getVisaFiles(authToken);
        }
      });
    },
    toNewFile(res) {
      // app.login(load => {
      //   if (load) {
      //     return;
      //   }
      //   wx.navigateTo({
      //     url: `../visaFiles/visaFiles?isNew=true`
      //   });
      // });
    }
  }
};
</script>
<style lang='scss' scoped>
/* pages/addVisaData/addVisaData.wxss */
.addVisaData {
  position: relative;
}
.data-box-tip {
  padding: 36rpx 56rpx;
  background: #fff;
  box-shadow: 0 10rpx 34rpx rgba(0, 0, 0, 0.07);
  margin-bottom: 20rpx;
  position: absolute;
  width: 100%;
  box-sizing: border-box;
  top: 0;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
}
.hide {
  transition: all ease 0.4s;
  transform: translate3d(-50%, -110%, 0);
}
page {
  background: #fdfdfd;
  -webkit-overflow-scrolling: touch;
}
.data-box-tip .medium {
  font-size: 30rpx;
  color: #000;
  line-height: 42rpx;
}
.data-box-tip .tit {
  font-size: 48rpx;
  line-height: 66rpx;
  margin-bottom: 28rpx;
}
.data-box-tip .button {
  background: #198dfa;
  width: 220rpx;
  height: 80rpx;
  border-radius: 8rpx;
  color: #fff;
  font-size: 30rpx;
  margin-top: 40rpx;
}
.button icon {
  margin-right: 4rpx;
}
.visa-data {
  padding: 40rpx 54rpx 40rpx 0;
  margin-left: 48rpx;
  border-bottom: 1px solid #e3e3e3;
}
.new-visa-data {
  box-shadow: 0 10rpx 44rpx 2rpx rgba(0, 0, 0, 0.08);
  border: none;
  background: #fff;
  border-radius: 16rpx;
  margin: 40rpx 36rpx 0;
  padding: 40rpx 32rpx 40rpx 40rpx;
}
.add-btn image {
  width: 50rpx;
  height: 50rpx;
}
.showlist {
  margin-bottom: 40rpx;
  position: absolute;
  left: 0;
  width: 100%;
  transition: all ease 0.4s;
  transform: translate3d(0, 452rpx, 0);
}
.up {
  transform: translate3d(0, 0, 0);
  transition: all ease 0.5s;
}

.visa-data .medium,
.visa-data .ok,
.visa-data .not {
  color: #000;
  line-height: 50rpx;
  font-size: 36rpx;
}
.visa-data .ok {
  color: #999;
}

.visa-data .not {
  color: #1189fa;
}
.visa-data .visa-num {
  color: #666;
  font-size: 32rpx;
  line-height: 44rpx;
  margin-top: 26rpx;
}
.noVisa-button {
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
.p-name {
  color: #000;
  font-size: 36rpx;
  line-height: 50rpx;
}
</style>