const path = require('path');
const webpack = require('webpack');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const rules = require('./webpack/commonRules.js');

const config = {
  entry: {
    demo: './ddmrr/demo.js',
  },
  target: 'web',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './build/assets/'),
    publicPath: './static/assets/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new UglifyJSPlugin({
      // beautify: true,
    }),
  ],
  module: {
    rules,
  },
};

module.exports = config;
