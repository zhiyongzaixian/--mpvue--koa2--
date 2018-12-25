<template>
  <div id="books">
    <swiper indicator-dots circular indicator-color='gray' indicator-active-color="#02a774" >
      <swiper-item v-for="(item, index) in carouselList" :key="index">
        <img :src="item.image" alt="" @click="toBookItem(index)">
      </swiper-item>
    </swiper>
    <div class="allBooks">
      <div class="nav">
        <span class="all">全部商品</span>
        <span class="more" @click="toBookList(booksList)"> > </span>
      </div>
      <ul class="booksList">
        <li @click="toBookItem(index)" class="bookItem" v-for="(item, index) in booksList" :key="index">
          <img :src="item.image" alt="">
          <p class="bookName">《{{item.title}}》</p>
          <span class="bookDir">{{item.author[0]}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import { get } from '../../utils/request'
  import bookDatas from './data.json'
  console.log(bookDatas, typeof bookDatas);
  export default {

    data() {
      return {
        booksList: []
      }
    },
    async mounted(){
      this.booksList = bookDatas
    },
    computed: {
      carouselList(){
        return this.booksList.slice(0, 4)
      }
    },
    methods: {
      toBookItem(index){
        wx.navigateTo({
          url: '/pages/bookItem/main?bookItem=' + JSON.stringify(this.booksList[index])
        })
      },
      toBookList(booksList){
        wx.navigateTo({
          url: '/pages/bookList/main?booksList=' + JSON.stringify(booksList)
        })
      }
    }
  }
</script>
<style lang="stylus">
  #books
    swiper
      width 100%
      height 400rpx
      img
        width 100%
        height 100%
    .allBooks
      .nav
        display flex
        justify-content space-between
        padding 20rpx
        .all
          font-size 34rpx
          color #333
        .more
          width 100rpx
          height 100%
          font-size 26rpx
          color #02a774
          text-align right
      .booksList
        display flex
        flex-wrap wrap
        .bookItem
          width 50%
          padding 20rpx
          box-sizing border-box
          display flex
          flex-direction column
          align-items center
          white-space nowrap
          overflow hidden
          text-overflow ellipsis
          border-bottom 1rpx solid #eee
          img
            width 200rpx
            height 200rpx
          .bookName
            font-size 32rpx
            margin 16rpx 0
          .bookDir
            font-size 28rpx
          &:nth-child(2n + 1)
            border-right 1rpx solid #eee

</style>