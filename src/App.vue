<script>
import {get} from './utils/request'
import {setStorage, removeStorage} from './utils/storage'
// 开发者的appId和密钥，密钥动态生成
const appId = 'wx0db5ac6ea2aca4fe'
const appKey = '4a9ed63ce3ff7701485a2ccb27dd1ba1'

export default {
  created () {
    wx.clearStorage()
    this.getOpenId()
  },
  methods: {
    getOpenId(){
      wx.login({
        success: async (res) => {
          if(res.code){
            let userOpenId = await get('/getUserAppId', {appId, appKey, code: res.code})
            userOpenId = JSON.parse(userOpenId.data);
            // openId 用户唯一标识
            // session_key 会话密钥，对用户数据进行签名加密的密钥
            console.log(userOpenId.openid,'openid'); // {session_key: "/d58F1wzMMgpEnziAda5jQ==", openid: "ozByZ5RqVxvECZFaHC3JF8vVifUU"}
            setStorage('openid', userOpenId.openid)
          }
        }
      })
    }
  },
  beforeDestroy(){
    // 组件销毁前移除openid数据
    removeStorage()
  }
}
</script>

<style lang="stylus">
  @import "common/css/mixins.styl"
</style>
