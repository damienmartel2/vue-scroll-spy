const path = require('path'),
  webpack = require('webpack'),
  baseConfig = require('./webpack.base.config.js')

module.exports = Object.assign({
  entry: './demo/main.js',
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'main.js'
  },
  devServer: {
    contentBase: path.join(__dirname, "demo"),
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}, baseConfig)
