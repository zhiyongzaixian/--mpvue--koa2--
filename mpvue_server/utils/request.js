// 发送请求的工具库
let Fly = require('flyio/src/node')

let flyio = new Fly
exports.get = function (url, data) {
  return new Promise((resolve, reject) => {
    flyio.get(url)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        reject(error)
      });
  })
}
