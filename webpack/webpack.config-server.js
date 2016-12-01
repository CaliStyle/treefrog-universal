'use strict'
const path = require('path')
const helpers = require('./helpers')

module.exports = function(config) {
  config.target = 'node'
  config.entry =  {
    express: path.resolve(__dirname, helpers.root('server.ts')),
    test: path.resolve(__dirname, helpers.root('test/server.ts'))
  }
  config.output.filename = 'server/[name]-bundle.js'
  config.output.library = 'universal'
  config.output.libraryTarget = 'commonjs2'
  const nodeEnv = process.env.NODE_ENV
  let isProd = false
  if (nodeEnv !== 'dev' || nodeEnv !== 'development') {
    isProd = true
  }

  // Alow ES6 on the Server
  config.module.rules.unshift({
    test: /\.(ts)$/,
    loaders: [
      'awesome-typescript-loader?' + JSON.stringify({target: 'es6'}),
      'angular2-template-loader'
    ].concat(isProd ? [] : '@angularclass/hmr-loader?pretty=' + !isProd + '&prod=' + isProd),
    exclude: [/node_modules/]
  })
  //patch ngrx/db
  config.module.rules.unshift({
     test: /@ngrx(\\|\/)db/, use: "imports-loader?window=>global"
  })

  config.externals = helpers.ignoreAlias(config)

  config.node = {
    global: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: true
    // console: false,
    // global: false,
    // process: false,
    // Buffer: false,
    // __filename: false,
    // __dirname: false
  }

  return config
}

if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
    'use strict'
    const O = Object(this)
    const len = parseInt(O.length, 10) || 0
    if (len === 0) {
      return false
    }
    const n = parseInt(arguments[1], 10) || 0
    let k
    if (n >= 0) {
      k = n
    }
    else {
      k = len + n
      if (k < 0) {k = 0}
    }
    let currentElement
    while (k < len) {
      currentElement = O[k]
      if (searchElement === currentElement ||
        (searchElement !== searchElement && currentElement !== currentElement)) { // NaN !== NaN
        return true
      }
      k++
    }
    return false
  }
}
