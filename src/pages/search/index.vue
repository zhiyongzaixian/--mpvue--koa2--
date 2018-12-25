<template>
  <div id="search">
    <div class="searchContent">
      <input v-model="searchContent"  type="text" placeholder="书中自有黄金屋" placeholder-class="placeholder"   confirm-type="search" @confirm="confirm">
      <span class="clean" v-show="isClean" @click="searchContent = ''">X</span>
    </div>

    <div v-if="booksList.length">
      <p class="search_title">搜索到图书共 {{booksList.length}} 本</p>
      <BookList :booksList="booksList"/>
    </div>
    <div v-if="noBooks">
      没有搜索到对应的图书
    </div>

  </div>
</template>
<script>
  import BookList from '../bookList/index.vue'
  import {get} from '../../utils/request'
  export default {
    data() {
      return {
        searchContent: '',
        booksList: [],
        noBooks: false,
        isClean: false
      }
    },
    components: {
      BookList
    },
    methods: {
      async confirm(event){
        let searchContent = {req: this.searchContent}
        if(searchContent === ''){
          return
        }
        let result = await get('/searchBooks', searchContent)
        this.booksList = result.data.books
        if(!this.booksList.length){
          this.noBooks = true
        }else {
          this.noBooks = false
        }
      }
    },
    watch: {
      searchContent(){
        this.isClean = this.searchContent.length?true:false
      }
    }
  }
</script>
<style lang="stylus">
  #search
    .searchContent
      position relative
      width 80%
      height 60rpx
      border-bottom 1rpx solid #02a774
      margin 20rpx auto
      .clean
        position absolute
        right 0
        top 0
        width 60rpx
        height 100%
        line-height 60rpx
        text-align center
        z-index 99
      .placeholder
        font-size 28rpx
        color #02a774
        text-align center
    .search_title
      font-size 28rpx
      color #666666
      padding 20rpx
</style>