<template>
  <div id="scan">
    <button @click="handleScan">扫码查看图书</button>
  </div>
</template>
<script>
  import {get} from '../../utils/request'
  export default  {
    methods: {
      handleScan(){
        // 调用收集摄像头扫码
        wx.scanCode({
          async success(res) {
            let scanCode = res.result;
            // console.log(typeof res.result);
            if(!/[a-z]/gi.test(scanCode)){
              let result = await get('/scanBook', {scanCode})
              wx.navigateTo({
                url: '/pages/bookItem/main?bookItem=' + JSON.stringify(result.data)
              })
            }else {
              wx.showToast({
                title: '扫码格式不对'
              })
            }

          },
          fail(){
            wx.showToast({
              title: '扫码格式不对'
            })
          }
        })
      }
    }
  }
</script>
<style lang="stylus">

</style>