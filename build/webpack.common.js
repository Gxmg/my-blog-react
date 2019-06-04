// 公共配置
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin'); // 使用方法已废弃
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js'
  },
  devServer: {
    hot:true,
    hotOnly:true,
    contentBase: '../dist',
    historyApiFallback: true,
    inline: true, // 实时刷新
    port: 8888, // 监听端口
    compress: true, // 全部服务开启gzip压缩
    open: false // 自动打开浏览器
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 热更新
    new HtmlWebpackPlugin({
      template: './index.html',
      hash: true // 在打包好的mainjs后面加上hash值
    }),
    new CleanWebpackPlugin() // 每次打包先清除dist
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude:/(node_modules)/,  //排除掉nod_modules,优化打包速度
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
        // use:[
        //   // fallback to style-loader in development
        //   process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
        //   "css-loader",
        //   "sass-loader"
        // ]
      },
      {
        test:/\.(png|jpg|gif)$/,
        use:[
            "url-loader"
        ]
      }
    ]
  }
}