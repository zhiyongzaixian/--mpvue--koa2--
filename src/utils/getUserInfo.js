export default () => {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      success(info){
        resolve(info)
      },
      fail(error){
        reject(error)
      }
    })
  })
}