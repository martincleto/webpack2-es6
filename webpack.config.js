'use strict';

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
const basePath = './';
const dir_src = path.resolve(__dirname, basePath, 'src')
const dir_js = path.resolve(__dirname, dir_src, 'js');
const dir_html = path.resolve(__dirname, dir_src, 'html');
const dir_build = path.resolve(__dirname, basePath, 'build');

let baseConfig = {
    entry: {
        main: path.resolve(dir_js, 'main.js'),
        vendor: [
            'babel-polyfill'
        ]
    },
    output: {
        filename: '[name].js?[hash]',
        path: dir_build
    },
    module: {
        rules: [
            {
                test: /(\.jsx?)$/,
                loader: 'babel-loader',
                exclude: [
                    path.resolve(__dirname, 'node_modules'),
                    dir_js + '/**/*.spec.js'
                ],
                options: {
                    'plugins': ['transform-decorators-legacy'],
                    'presets': ['es2015']
                }
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {
              from: dir_html
            } // to: output.path
        ])
    ]
};
let envConfig = require(`./config/webpack.config.${env}.js`);

module.exports = merge(baseConfig, envConfig);
