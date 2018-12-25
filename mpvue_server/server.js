let config = require('./utils/urlConfig')
const Koa = require('koa')
const Router = require('koa-router')


const app = new Koa()
const router = new Router()
const kogLog = require('./koa-logger')
let {get} = require('./utils/request')

let openId = ''
let bookCollections = [27033213, 26694486, 19487522 ]

app.use(kogLog)

router.get('/', (ctx, next) => {
  ctx.body = '<h1>404</h1>'
})



// 获取用户登录appid
router.get('/getUserAppId', async (ctx, next) => {
  let {appId, appKey, code} = ctx.query;
  let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appKey}&js_code=${code}&grant_type=authorization_code`
  let result = await get(url);
  // 更新服务端openid, !!! 注意坑，数据类型
  openId = JSON.parse(result.data).openid;
  ctx.body = result;
})



router.get('/searchBooks', async (ctx, next) => {
  let reqName = ctx.query;
  let url = `https://api.douban.com/v2/book/search?q=${reqName.req}`;
  console.log(url);
  let result = await get(url)
  ctx.body = result;
})





// 处理用户收藏图书
router.post('/collectionBook',  async (ctx, next) => {
  let str = ''
  
  // 定义获取请求参数的异步方法
  function getParams() {
    return new Promise((resolve, reject) => {
      ctx.req.on('data', (data) => {
        str += data
      })
  
      ctx.req.on('end', () => {
        str = JSON.parse(str)
        // 模拟后台判断是否有该用户
        if(str.user === openId){
          // 用户点击收藏的书籍之前是否收藏
          console.log(bookCollections, str.bookId);
          if(bookCollections.indexOf(str.bookId*1) === -1){
            bookCollections.push(str.bookId*1)
          }
          
          resolve(bookCollections)
        }
      })
    })
  }
  
  
  // 异步等待获取参数的操作，再响应前端数据，否则前端会报错
  bookCollections = await getParams()
  console.log(bookCollections);
  ctx.body = true;
  
})


router.get('/getCollections', async (ctx, next) => {
  let {userOpenId} = ctx.request.query;
  let bookCollectionsInfo = [];
  if(userOpenId === openId){
    
    // 不能使用map，不等待。。。
    // let bookCollectionsInfo = bookCollections.map(async item => {
    //   let result =  await get(`https://api.douban.com/v2/book/${item}`)
    //   return result.data
    // })
  
    for (var i = 0; i < bookCollections.length; i++) {
      let item = bookCollections[i];
      let result = await get(`https://api.douban.com/v2/book/${item}`)
      bookCollectionsInfo.push(result.data);
    }
    console.log(bookCollectionsInfo.length);
    ctx.body = bookCollectionsInfo
  }else {
    ctx.body = false;
  }
  
})




router.get('/scanBook', async (ctx, next) => {
  let {scanCode} = ctx.query;
  let url = 'https://api.douban.com/v2/book/isbn/' + scanCode
  let result = await get(url);
  ctx.body = result;
})




app
  .use(router.routes())
  .use(router.allowedMethods());



app.listen('3000', () => {
  console.log('服务器开启成功');
  console.log('服务器地址: ', config.host);
})