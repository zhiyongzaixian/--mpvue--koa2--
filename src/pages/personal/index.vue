x<template>
  <div id="personal">
      <header>
        <div class="userInfo">
          <img :src="userInfo.avatarUrl?userInfo.avatarUrl:'/static/imgs/personal/personal.png'" alt="">
          <button v-if="!userInfo.nickName" open-type="getUserInfo" class="loginBtn" @getuserinfo="handleGetUserInfo">登录</button>
          <button v-else class="loginBtn">{{userInfo.nickName}}</button>
        </div>
      </header>
      <div class="tabList">
        <div class="tab collection" @click="getCollections">
          <span class="text">我的收藏</span>
          <span class="more">more&nbsp;&nbsp;> </span>
        </div>
        <div class="tab scan" @click="toScan">
          <span class="text">扫码看书</span>
          <span class="more">more&nbsp;&nbsp;> </span>
        </div>
      </div>
  </div>
</template>
<script>
  import getUserInfo from '../../utils/getUserInfo'
  import {get} from '../../utils/request'
  import {setStorage, getStorage} from '../../utils/storage'
  // 开发者的appId和密钥，密钥动态生成
  const appId = 'wx0db5ac6ea2aca4fe'
  const appKey = '4a9ed63ce3ff7701485a2ccb27dd1ba1'
  
  export default {
    data() {
      return {
        userInfo: {},
        isLogin: false,
        openid: ''
      }
    },
    async mounted(){
      // 通过openId 去本地缓存查看是否有用户缓存数据
      let openid = await getStorage('openid')
      let userInfo = await getStorage(openid)
      if(userInfo){
        // 本地有缓存数据
        this.userInfo = userInfo
      }else {
        // wx.getUserInfo获取用户登录信息
        let result = await getUserInfo()
        this.userInfo = result.userInfo
        // 通过openId将对应的用户信息缓存到本地
        setStorage(this.openid, userInfo)
      }

    },
    methods:{
      async handleGetUserInfo(){
        let result = await getUserInfo()
        this.userInfo = result.userInfo
        // 通过openId将对应的用户信息缓存到本地
        let openid = await getStorage('openid')
        setStorage(openid, this.userInfo)
      },
      async getCollections(){
        let openId = await getStorage('openid')
        let userInfo = await getStorage(openId)

        // 判断用户是否授权登录
        if(!userInfo){ // 如果没有登录提示用户登录
          wx.showToast({
            title: '请先登录',
            icon: "none"
          })
        }else { // 登录以后发送请求获取对应收藏的文章列表，跳转页面
          // 获取用户收藏的文章
          let collectionsResult = await get('/getCollections', {userOpenId: openId});
          wx.navigateTo({
            url: '/pages/bookList/main?booksList=' + JSON.stringify(collectionsResult)
          })
        }
      },
      toScan(){
        wx.navigateTo({
          url: '/pages/scan/main'
        })
      }
    }
  }
</script>
<style lang="stylus">
  #personal
    header
      height 200rpx
      background #02a774
      .userInfo
        padding 40rpx
        img
          width 100rpx
          height 100rpx
          vertical-align middle
          border-radius 50rpx
       .loginBtn
          display inline-block
          height 60rpx
          border none
          line-height 60rpx
          text-align center
          font-size 14px
          margin-left 30rpx
          color #fff
          background rgba(0,0,0, .2)
          vertical-align middle



  .tabList
    padding 30rpx
    .tab
      width 100%
      height 80rpx
      border 1rpx solid #eee
      border-radius 16rpx
      line-height 80rpx
      margin 20rpx 0
      position relative
      .text
        font-size 30rpx
        margin-left 20rpx

      .more
        font-size 26rpx
        position: absolute
        right 20rpx
        color #666


</style>