module.exports = async (ctx, next) => {
  let start = new Date().getTime()
  
  await next()
  let end = new Date().getTime()
  console.log('花费时间： ', end - start);
}