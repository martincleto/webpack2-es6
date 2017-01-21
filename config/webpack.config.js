
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const basePath = '..';
const dir_src = path.resolve(__dirname, basePath, 'src')
const dir_js = path.resolve(__dirname, dir_src, 'js');
const dir_html = path.resolve(__dirname, dir_src, 'html');
const dir_build = path.resolve(__dirname, basePath, 'build');

module.exports = {
    entry: {
        main: path.resolve(dir_js, 'main.js')
        /*
        vendor: []
        */
    },
    output: {
        filename: '[name].js',
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
        new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en|es)$/),
        new CopyWebpackPlugin([
            { from: dir_html } // to: output.path
        ])
    ],
    devtool: 'cheap-module-source-map',
    devServer: {
        contentBase: dir_build
    }
};