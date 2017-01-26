// Webpack configuration for production

'use strict';

const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      debug: true,
      minimize: true,
      sourceMap: false,
      test: /(\.jsx?)$/
    })
  ],
  devtool: 'cheap-module-source-map'
};
