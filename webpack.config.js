'use strict';

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');

const basePath = './';
const dirSrc = path.resolve(__dirname, basePath, 'src');
const dirHTML = path.resolve(__dirname, dirSrc, 'html');
const dirJS = path.resolve(__dirname, dirSrc, 'js');
const dirSASS = path.resolve(__dirname, dirSrc, 'sass');
const dirBuild = path.resolve(basePath, 'build');
const env = process.env.NODE_ENV || 'development';

let baseConfig = {
    entry: {
      main: [
        path.join(dirJS, 'main.js'),
        path.join(dirSASS, 'main.scss')
      ],
      vendor: [
        'babel-polyfill'
      ]
    },
    output: {
        filename: '[name].js?[hash]',
        path: dirBuild,
        publicPath: '/'
    },
    resolve: {
      alias: {
        bourbon: path.resolve(__dirname, basePath, 'node_modules/bourbon/app/assets/stylesheets')
      }
    },
    module: {
        rules: [
          {
            test: /(\.jsx?)$/,
            loader: 'babel-loader',
            exclude: [
                path.resolve(__dirname, 'node_modules'),
                dirJS + '/**/*.spec.js'
            ],
            options: {
              'plugins': ['transform-decorators-legacy'],
              'presets': ['es2015']
            }
          },
          {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('css-loader?sourceMap!sass-loader?sourceMap')
          },
          {
            test: /\.html$/,
            loader: 'html-loader'
          }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
          filename: 'css/styles.css?[hash]',
          allChunks: true
        }),
        new HtmlWebpackPlugin({
          hash: true,
          template: path.join(dirHTML, 'index.html')
        })
    ]
};
let envConfig = require(`./config/webpack.config.${env}.js`);

module.exports = merge(baseConfig, envConfig);
