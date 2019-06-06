// 配置mock服务
const Mock = require('mockjs');
const path = require('path');
const app = require('express')();
const fs = require('fs');
const glob = require('glob');
// app.get('/mock', function(req, res) {
//   res.send('hello world');
// })
let urlList = [];
async function init() {
  const apiPath = path.join(__dirname, './*.json');
  let apiPathArr = await getPath(apiPath); // 存储当前mock目录下的所有json文件的 路径数组
  await getApiUrl();
  // 监听json的变化
  apiPathArr.forEach(async val => {
    await fs.watchFile(val, curr => {
      console.log('api is change', curr.mtime);
      getApiUrl();
    })
  })
  function getApiUrl() {
    // 根据路径文件，读取每个json里面的内容
    apiPathArr.forEach(async val => {
      await fs.readFile(val, 'utf-8', (err, cont) => {
        if (err) throw err;
        if (!cont) console.log('content must exsit');
        urlList.push(JSON.parse(cont));
      })
    });
  }
}
init();
app.use((req, res) => {
  let data;
  let delay = 0;
  urlList.forEach(val => {
    val.forEach(resdata => {
      if (resdata.regexp) {
        if (!new RegExp(resdata.url).test(req.originalUrl)) {
          return false;
        }
      } else if (req.originalUrl.indexOf(resdata.url) !== 0) {
        return false;
      }
      // return false  是判断读取的文件中有没有 请求的URL 也就是originurl 是否在请求的json文件中
      let apiRes = resdata.res; // json 里面的res
      data = resdata.mock ? Mock.mock(apiRes) : apiRes;// 如果是json里面用到了mock语法，则转换一下
      delay = resdata.delay || 0;
      return true;
    })
  })
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT, OPTIONS, HEADE');
  res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-type, Accept, Authorization');
  data !== undefined ? setTimeout(() => res.json(data), delay): res.sendStatus(404);
})
app.listen(18000, () => {
  console.log('your Mock sercer is running 18000！');
})

function getPath(path, options = {}) {
  // 根据当前文件的路径 获取当前目录下的所有json文件
  return new Promise((resolve, reject) => {
    glob(path, options, (er, files) => {
      if (er) {
        reject(er);
      } else {
        resolve(files);
      }
    })
  })
}