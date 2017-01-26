// Webpack configuration for development

'use strict';

const webpack = require('webpack');
const path = require('path');

// @TODO [DRY] fetch 'dir_build' from main config file
const basePath = '../';
const dir_build = path.resolve(__dirname, basePath, 'build');

module.exports = {
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: dir_build,
    hot: true,
    stats: {  // @see https://webpack.js.org/configuration/stats/
      assets: true,
      errors: true,
      errorDetails: true,
      timings: true,
      version: false,
      warnings: true
    }
  }
};
