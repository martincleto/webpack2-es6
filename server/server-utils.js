'use strict'

const chalk = require('chalk')
const fs = require('fs')
const mime = require('mime-types')
const path = require('path')
const url = require('url')

const buildPath = path.resolve(__dirname, '../build')  //@TODO fetch this from Webpack

function changeDir(newDirPath) {
  try {
    process.chdir(newDirPath)
    log(`Current working directory: ${process.cwd()}`)
  }
  catch (err) {
    log(`chdir: ${err}`, 'error')
  }
}

function reqHandler(req, res) {
  const parsedUrl = url.parse(req.url)
  let pathname = `.${parsedUrl.pathname}`

  fs.exists(pathname, exist => {
    if (!exist) {
      res.statusCode = 404
      res.end(`File ${pathname} not found!`)
      return
    }

    if (fs.statSync(pathname).isDirectory()) {
      pathname += 'index.html'
    }

    fs.readFile(pathname, (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end(`Error getting the file: ${err}.`)
      } else {
        let mimetype = mime.contentType(path.extname(pathname))

        res.setHeader('Content-type', mimetype)
        res.end(data)
      }
    })
  })
}

function log(message, level) {
  let levels = ['log', 'info', 'warn', 'error']

  if (!level || levels.indexOf(level) < 0) {
    level = 'log'
  }

  let style = {
    log: chalk.green,
    info: chalk.white,
    warn: chalk.yellow,
    error: chalk.bold.red
  }

  console[level](style[level]('[server] ' + message))
}

module.exports = {
  buildPath: buildPath,
  changeDir: changeDir,
  log: log,
  reqHandler: reqHandler
}
