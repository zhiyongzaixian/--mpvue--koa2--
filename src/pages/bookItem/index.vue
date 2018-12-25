<template>
  <div id="bookItem">
    <p class="title">{{bookItem.title}}</p>
    <img :src="bookItem.image" alt="">
    <div class="bookInfo" v-if="bookItem.author">
      <span>作者: {{bookItem.author[0]}}</span>
      <span>出版社: {{bookItem.publisher}}</span>
      <span>出版日期: {{bookItem.pubdate}}</span>
      <span>定价: {{bookItem.price}}</span>
    </div>
    <button class="collectionBtn" @click="handleCollection(bookItem.id)">收藏该文章</button>
    <div class="info">
      <p class="title">作者简介...</p>
      <p class="content">{{bookItem.author_intro}}</p>
      <p class="title">内容简介...</p>
      <p class="content">{{bookItem.summary}}</p>
    </div>
  </div>
</template>

<script>
  import {getStorage} from '../../utils/storage'
  import {post} from '../../utils/request'
  export default {
    data(){
      return {
        bookItem: {}
      }
    },
    mounted(){
      // 获取跳转页面后传入的参数数据，转换为js对象
      this.bookItem = JSON.parse(this.$mp.query.bookItem)
      // 动态更新标题
      wx.setNavigationBarTitle({
        title: this.bookItem.title
      })
    },
    methods: {
      async handleCollection(id){

        // 获取当前图书id标识
        // 获取当前用户openid
        let openid = await getStorage('openid')
        let userInfo = await getStorage(openid)
        if(!userInfo){
          wx.showToast({
            title: '请先登录',
            icon: 'none'
          })
          return
        }
        // 将当前openid和图书id发送给后台
        let collectionObj = {
          user: openid,
          bookId: id
        }
        await post('/collectionBook', collectionObj)
        wx.showToast({
          title: '收藏成功'
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #bookItem
    .title
      font-size 34rpx
      font-weight 500
      text-align center
      line-height 60rpx
    img
      display: block
      width 70%
      height 700rpx
      margin 20rpx auto
    .bookInfo
      display flex
      flex-direction column
      padding-left 15%
      span
        font-size 28rpx
        color: #666
        line-height 50rpx
    .collectionBtn
      width 300rpx
      height 60rpx
      line-height 60rpx
      font-size 28rpx
      margin 30rpx auto
    .info
       padding:40rpx
       .title
         font-size 36rpx
         font-weight bold
         color #02a774
       .content
         font-size 32rpx
         text-indent 32rpx
         color #333
         line-height 50rpx
</style>