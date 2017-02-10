'use strict'

const chalk = require('chalk')
const dop = require('dop')
const fs = require('fs')
const http = require('http')
const mime = require('mime-types')
const path = require('path')
const url = require('url')

// you can pass host and port as the arguments - e.g. node server.js mylocal 9000
const host = process.argv[2] || 'localhost'
const port = process.argv[3] || 3000
const chlk = {
  error: chalk.bold.red,
  info: chalk.gray,
  important: chalk.bold.green
}

let buildPath = './build'

// change cwd to build path
try {
  process.chdir(buildPath)
  console.info(`Current working directory: ${process.cwd()}`)
}
catch (err) {
  console.error(`chdir: ${err}`)
}

// connect to Webpack node
const webpackServer = dop.connect()

webpackServer.on('connect', () => {
  console.log('Connected to Webpack Build Server')

  webpackServer.subscribe()
    .then(buildData => console.log(buildData))
    .catch(error_msg => console.error(chlk.error(error_msg)))
})

let handleReq = (req, res) => {
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

http
  .createServer(handleReq)
  .listen(parseInt(port), function() {
    let uri = chlk.important(`http://${host}:${port}`)
    let tip = chlk.info('CTRL+C to shutdown')

    console.info(`Server running at ${uri}/\n${tip}`)
    console.log(process.cwd())
})
