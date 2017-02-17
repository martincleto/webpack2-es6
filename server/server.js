'use strict'

const dop = require('dop')
const http = require('http')
const mime = require('mime-types')
const path = require('path')

const publisher = require('./server-publisher')
const {changeDir, log, reqHandler} = require('./server-utils')

// host and port can be passed as arguments - e.g. node server/server.js mylocal 9000
const host = process.argv[2] || 'localhost'
const port = process.argv[3] || 3000

changeDir(utils.buildPath)

// connect to Webpack node
const webpackServer = dop.connect()

webpackServer.on('connect', () => {
  console.log('Connected to Webpack Build Server')

  webpackServer.subscribe()
    .then(buildData => console.log(buildData))
    .catch(error_msg => console.error(chlk.error(error_msg)))
})

http.createServer(reqHandler)
    .listen(port, () => {
        log(`Server running at http://${host}:${port}`)
        log('CTRL+C to shutdown', 'info')
    })
