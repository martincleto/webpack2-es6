'use strict';

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');

const basePath = './';
const dirSrc = path.resolve(__dirname, basePath, 'src');
const dirAssets = path.resolve(__dirname, dirSrc, 'assets');
const dirHTML = path.resolve(__dirname, dirSrc, 'html');
const dirJS = path.resolve(__dirname, dirSrc, 'js');
const dirBuild = path.resolve(basePath, 'build');
const env = process.env.NODE_ENV || 'development';

let baseConfig = {
    entry: {
      main: path.join(dirJS, 'main.js'),
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
        bourbon: path.resolve(__dirname, basePath, 'node_modules/bourbon/app/assets/stylesheets'),
        breakpoint: path.resolve(__dirname, basePath, 'node_modules/breakpoint-sass/stylesheets')
      }
    },
    module: {
        rules: [
          {
            test: /\.jsx?$/,
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
            loader: ExtractTextPlugin.extract('css-loader?sourceMap!postcss-loader!sass-loader?sourceMap')
          },
          {
            test: /\.html$/,
            loader: 'html-loader'
          },
          {
            test: /\.(jpe?g|png|gif|svg)$/,
            exclude: [
              path.join(dirSrc, 'assets/fonts')
            ],
            loader: 'file-loader?name=images/[name].[ext]?[hash]'
          },
          {
            test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader?limit=10000&name=fonts/[name].[ext]?[hash]',
            include: [
              path.join(dirSrc, 'assets/fonts')
            ],
          },
          {
            test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
            loader: 'file-loader?name=fonts/[name].[ext]?[hash]',
            include: [
              path.join(dirSrc, 'assets/fonts')
            ],
          }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
          {
            from: dirAssets,
            ignore: [
              '.DS_Store',
              'fontawesome*',
              '*.otf'
            ]
          }
        ]),
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
