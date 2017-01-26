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

* `$ npm start` command creates a development build and starts a web server at <http://localhost:8080/>
* `$ npm run build` command generates a production build
* `$ npm run watch` command watches the updates on your project files

## Notes for developers

### Profiling and analysing the bundle

In order to improve and lint your bundle, you might want to inspect and analyse it. A `bundle-stats` npm script is available for this purpose.

* Create a new folder *stats* into your project root folder: `$ mkdir stats`
* `$ npm run bundle-stats`: a *webpack-bundle-stats.json* file will be created into stats/ folder
* Browse <https://webpack.github.io/analyse/> and upload the JSON file. A comprehensive profiling UI will be loaded based on you bundle stats.

Edit *package.json* to change path and JSON file name at your convenience.

## To do

* [ ] Adding e2e test <https://github.com/martincleto/webpack2-es6/tree/chore/e2e-tests>
* [ ] Adding SASS support <https://github.com/martincleto/webpack2-es6/tree/feature/sass-support>
* [ ] Adding static assets such as images, svg and so on to the build <https://github.com/martincleto/webpack2-es6/tree/feature/add-static-assets>
* [ ] Improving performance and decreasing Webpack build process time <https://github.com/martincleto/webpack2-es6/tree/chore/improve-webpack-perfomance>
* [ ] Adding technical notes and reference links to this doc <https://github.com/martincleto/webpack2-es6/tree/chore/common>
