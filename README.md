# webpack2-es6
Webpack 2 + ES6 boilerplate (currently WIP)

## Requisites

* node.js v6 or higher
* npm v3 or higher

## Installation

*  `$ git clone git@github.com:martincleto/webpack2-es6.git`
or alternatively `$ git clone https://github.com/martincleto/webpack2-es6.git`
* Into the folder you have downloaded this repository in your file system, run `$ npm install`
* To run the tests, type `$ npm test`

## Usage

* `$ npm start` creates a development build and starts a web server at <http://localhost:8080/>
* `$ npm run build` generates a production build
* `$ npm run watch` watches the updates on your project files

## Notes for developers

### SASS libraries
This boilerplate comes with [Bourbon](http://bourbon.io/) library for convenient [SASS](http://sass-lang.com/) development.

If you want to use other SASS libraries (or no libraries at all) just follow these steps

* Uninstall it: `$ npm uninstall node-bourbon --save dev`  
* Remove it corresponding *@import* entry from [src/sass/main.scss](blob/master/src/sass/main.scss)
* Remove *bourbon* entry from *alias* section in [webpack.config.js](blob/master/webpack.config.js)

### PostCSS
This boilerplate includes [PostCSS](http://postcss.org/) via Webpack [postcss-loader](https://github.com/postcss/postcss-loader) for enabling [autoprefixer](https://github.com/postcss/autoprefixer) plugin.

If you want to add or remove PostCSS plugins you need to update the *postcss* section into [package.json](blob/master/package.json)

### Profiling and analyzing the bundle

In order to improve and lint your bundle, you might want to inspect and analyze it. A `bundle-stats` npm script is available for this purpose.

* Create a new folder *stats* into your project root folder: `$ mkdir stats`
* `$ npm run bundle-stats`: a *webpack-bundle-stats.json* file will be created into stats/ folder
* Browse <https://webpack.github.io/analyse/> and upload the JSON file. A comprehensive profiling UI will be loaded based on you bundle stats.

Edit *package.json* to change path and JSON file name at your convenience.

## To do

* [ ] Setting a production-like env by a basic node server 
* [ ] Adding e2e test <https://github.com/martincleto/webpack2-es6/tree/chore/e2e-tests>
* [x] ~~Adding SASS support~~ <https://github.com/martincleto/webpack2-es6/tree/feature/sass-support>
* [x] ~~Adding static assets such as icon-fonts, images, svg and so on to the build~~ <https://github.com/martincleto/webpack2-es6/tree/feature/add-static-assets>
* [ ] Improving performance and decreasing Webpack build process time <https://github.com/martincleto/webpack2-es6/tree/chore/improve-webpack-perfomance>
* [ ] Adding technical notes and reference links to this doc <https://github.com/martincleto/webpack2-es6/tree/chore/common>
