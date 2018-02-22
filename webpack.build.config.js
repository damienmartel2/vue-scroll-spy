const path = require('path'),
      webpack = require('webpack'),
      baseConfig = require('./webpack.base.config.js')

const PROD = (process.env.NODE_ENV === 'production');

module.exports = Object.assign({
  entry: {
    'vue-scroll-spy.js': './src/index.js',
    'vue-scroll-spy.min.js': './src/index.js',
  },
  output: {
    filename: '[name]',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    library: ['vue-scroll-spy'],
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
        },
      },
    ],
  },
  plugins: PROD ? [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true,
    }),
  ] : [],
}, baseConfig);
