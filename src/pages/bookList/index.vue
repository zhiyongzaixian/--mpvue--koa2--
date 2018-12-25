<template>
  <div id="bookList">
    <ul class="list">
      <li class="bookItem" v-for="(item, index) in booksList" :key="index" @click="toDetail(item)">
        <img :src="item.image" alt="">
        <div class="content">
          <span>{{item.title}}</span>
          <span>作者: {{item.author[0]}}</span>
          <span>出版社: {{item.publisher}}</span>
        </div>
        <span class="price">{{item.price}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      booksList: Array
    },
    mounted(){
      if(this.$mp){
        this.booksList = JSON.parse(this.$mp.query.booksList);
      }
      this.booksList = this.booksList.map(item => {
          item.price  = item.price.replace('CNY ', '￥ ')
          item.price  = item.price.replace('USD ', '$ ')
          return item
      })

      console.log(this.booksList);
    },
    onHide(){
      console.log('组件隐藏');
    },
   
    methods: {
      toDetail(bookItem){
        wx.navigateTo({
          url: '/pages/bookItem/main?bookItem=' + JSON.stringify(bookItem)
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  #bookList
    .list
      .bookItem
        border-top 1rpx solid #eee
        display flex
        padding 20rpx
        position relative
        img
          width 140rpx
          height 140rpx
          margin-right 20rpx
        .content
          display flex
          flex-direction column
          max-width 50%
          span
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
            line-height 50rpx
            font-size 28rpx
        .price
          color red
          font-size 28rpx
          font-weight bold
          position absolute
          right 40rpx


</style>