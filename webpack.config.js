'use strict';

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');

const basePath = './';
const dir_src = path.resolve(__dirname, basePath, 'src');
const dir_src_html = path.resolve(__dirname, dir_src, 'html');
const dir_src_js = path.resolve(__dirname, dir_src, 'js');
const dir_src_sass = path.resolve(__dirname, dir_src, 'sass');
const dir_build = path.resolve(basePath, 'build');
const env = process.env.NODE_ENV || 'development';

let baseConfig = {
    entry: {
        main: [
          path.join(dir_src_js, 'main.js'),
          path.join(dir_src_sass, 'styles.scss')
        ],
        vendor: [
            'babel-polyfill'
        ]
    },
    output: {
        filename: '[name].js?[hash]',
        path: dir_build
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
                  dir_src_js + '/**/*.spec.js'
              ],
              options: {
                'plugins': ['transform-decorators-legacy'],
                'presets': ['es2015']
              }
            },
            {
              test: /\.scss$/,
              loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
          },
            {
              test: /\.html$/,
              loader: 'html-loader'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({ // define where to save the file
          filename: 'css/styles.css?[hash]',
          allChunks: true
        }),
        new HtmlWebpackPlugin({
          hash: true,
          template: path.join(dir_src_html, 'index.html')
        })
    ]
};
let envConfig = require(`./config/webpack.config.${env}.js`);

module.exports = merge(baseConfig, envConfig);
