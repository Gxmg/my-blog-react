## html-webpack-plugin  这个东西配置 可以 使首页的index.html 自动引入编译的JS文件
plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      hash: true
    })
  ]
## CleanWebpackPlugin之前的引入方法报错，换这样引入
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
## 使用这样  
new CleanWebpackPlugin() // 每次打包先清除dist

## 使用babel出错 Module build failed (from ./node_modules/babel-loader/lib/index.js):

是因为babel 7.X的原因造成的，没找到@babel/core，需要把babel-core卸载掉，从新安装@babel/core
npm un babel-core
npm i -D @babel/core
还有 将babel-preset-*卸载,重新安装@babel/preset-*，并且修改 .babelrc中的 presets
## 修改.babelrc文件改为一下内容
 "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ]

  ## 对了还有，一个记得配置文件种，entry 入口配置：babel-prolyfill,如果没有module 就安装npm i -D 安装一下