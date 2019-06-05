const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin'); // 使用方法已废弃
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const common = require('./webpack.common.js');
module.exports = merge(common, {
  mode: "production",
  plugins: [
    new UglifyJSPlugin(),
    new CleanWebpackPlugin() // 每次打包先清除dist
  ]
})