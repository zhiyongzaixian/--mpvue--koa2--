// 存数据

export  function setStorage(key, data) {
  wx.setStorage({
    key,
    data,
    success(){
      console.log('缓存成功');
    }
  })
}

export function getStorage(key) {
  return new Promise((resolve, reject) => {
    console.log(key);
    wx.getStorage({
      key,
      success(res){
        resolve(res.data)
      },
      fail(){
        resolve(false)
      }
    })
  })
}

export function removeStorage(key) {
  wx.removeStorage({key})
}