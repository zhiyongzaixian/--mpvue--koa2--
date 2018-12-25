// 发送请求的工具库
import config from './urlConfig'

export function get(url, data) {
  data = data?data:''
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      data,
      success: (res) => {
        resolve(res.data)
      }
    })
  })
}



export function post(url, data) {
  data = data?data:''
  console.log(data,'ceshi ');
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      method: 'POST',
      data,
      success: (res) => {
        resolve(res.data.data)
      }
    })
  })
}
