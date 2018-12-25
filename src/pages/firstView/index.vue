<template>
  <div id="firstView" >
    <swiper v-model ="index" :indicator-dots="isShow" @change="handleChange" indicator-color="pink" indicator-active-color="#02a774">
      <swiper-item>
        <img src="/static/imgs/meitu/douban/1.jpg" alt="">
      </swiper-item>
      <swiper-item>
        <img src="/static/imgs/meitu/douban/2.jpg" alt="">
      </swiper-item>
      <swiper-item>
        <img src="/static/imgs/meitu/douban/3.jpg" alt="">
      </swiper-item>
      <swiper-item>
        <img src="/static/imgs/nvsheng/03.jpg" alt="">
        <button @click="toBooks" class="btn" >开始体验</button>
      </swiper-item>
    </swiper>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        index: 0,
        isShow: true
      }
    },
    methods: {
      toBooks(){
        wx.switchTab({
          url: '/pages/books/main'
        })
      },
      handleChange(event){
        if(event.mp.detail.current === 3){
          this.isShow = false
        }else {
          this.isShow = true
        }
      }
    }
  }
</script>
<style lang="stylus">
  page
    width 100%
    height 100%
    #firstView
      width 100%
      height 100%
      swiper
        width 100%
        height 100%
        img
          width 100%
          height 100%
      .btn
        position absolute
        bottom 50rpx
        left 50%
        margin-left -130rpx
        width 260rpx
        height 60rpx
        line-height 60rpx
        text-align center
        border none
        background rgba(255, 255, 255, .7)
</style>