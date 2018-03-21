<!--swiper-->
<template>
   <div class="t-wrapper" 
   v-if="{{passportList.length > 0}}" 
   bindtouchstart="touchstart"
       bindtouchmove="touchmove" bindtouchend="touchend">
        <div class="passport-item {{name[idx]}}" catchlongpress="del" data-id="{{passport.id}}" data-index="{{idx}}" wx:for="{{passportList}}"
            wx:for-index="idx" wx:for-item="passport" wx:key="idx" wx:if="{{passportList.length > 0}}">
        </div>
    </div>          
</template>

<script>
export default {
  data() {
    return {};
  },

  components: {},

  computed: {},

  mounted: {},

  methods: {}
};
</script>
<style lang='scss' scoped>

</style>