// 开发环境的配置
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'inline-source-map', // 使用souce-map用于定位错误代码
  mode: 'development',
  devServer: {
    // historyApiFallback: true,
    contentBase: path.resolve(__dirname, './dist'),
    inline: true,//实时刷新
    open: false,
    compress: true,
    port:3000,
    hot:true  //开启热更新
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})
