const path = require('path');
const webpack = require('webpack');

const AssetsPlugin = require('assets-webpack-plugin');

const rules = require('./webpack/commonRules.js');

const config = {
  entry: {
    demo: './ddmrr/demo.js',
  },
  target: 'web',
  output: {
    filename: '[name].js',
    publicPath: '//local.web:7070/assets/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new AssetsPlugin({
      path: path.resolve(__dirname, './build'),
      filename: 'assets.json',
      prettyPrint: true,
    }),
    new webpack.SourceMapDevToolPlugin(),
  ],
  module: {
    rules,
  },
  devServer: {
    port: 7070,
    disableHostCheck: true,
    contentBase: path.resolve(__dirname, './build/public/assets'), // match the output path
    publicPath: '//local.web:7070/assets/', // https://webpack.js.org/configuration/dev-server/#devserver-publicpath-
    // or else resource like ttf will suffer cors
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-id, Content-Length, X-Requested-With',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    },
  },
  externals: {
    // when setting react as a external lib, webpack won't build react into the bundle.
    // but as InjectTapEventPlugin require some react sub files, webpack don't know these files are external.
    // As a result it build these files into the bundle.
    // so when InjectTapEventPlugin run and register tap event to react.
    // It register into a standalone react env and tap event can't fire
    // so always pack react with your app together, unless their is a solution of this issue.
  },
};

module.exports = config;
