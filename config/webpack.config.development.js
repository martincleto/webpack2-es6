// Webpack configuration for development

'use strict';

const webpack = require('webpack');
const path = require('path');

// @TODO [DRY] fetch 'dir_build' from main config file
const basePath = '../';
const dirBuild = path.resolve(__dirname, basePath, 'build');

module.exports = {
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: dirBuild,
    hot: true,
    publicPath: '/',
    stats: {  // @see https://webpack.js.org/configuration/stats/
      assets: true,
      errors: true,
      errorDetails: true,
      timings: true,
      version: false,
      warnings: true
    },
    watchContentBase: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
};
