'use strict'
const path = require('path')
const helpers = require('./helpers')

module.exports = function(config) {
  // Constants
  const nodeEnv = process.env.NODE_ENV

  // Set Target
  config.target = 'node'

  // Set Entry
  config.entry =  {
    express: path.resolve(__dirname, helpers.root('server.ts')),
    test: path.resolve(__dirname, helpers.root('test/server.ts'))
  }

  // Set Outputs
  config.output.filename = 'server/[name]-bundle.js'
  config.output.library = 'universal'
  config.output.libraryTarget = 'commonjs2'

  // Set is Production
  let isProd = false
  // This assumes that staging should act like production as well
  if (['dev','development','test','testing'].indexOf(nodeEnv) == -1) {
    isProd = true
  }

  /*
   * Typescript loader support for .ts
   *
   * Component Template/Style integration using `angular2-template-loader`
   * Angular 2 lazy loading (async routes) via `ng-router-loader`
   *
   * `ng-router-loader` expects vanilla JavaScript code, not TypeScript code. This is why the
   * order of the loader matters.
   *
   * See: https://github.com/s-panferov/awesome-typescript-loader
   * See: https://github.com/TheLarkInn/angular2-template-loader
   * See: https://github.com/shlomiassaf/ng-router-loader
   */
  config.module.rules.unshift({
    test: /\.(ts)$/,
    use: [
      {
        loader: '@angularclass/hmr-loader',
        options: {
          pretty: !isProd,
          prod: isProd
        }
      },
      // MAKE SURE TO CHAIN VANILLA JS CODE, I.E. TS COMPILATION OUTPUT.
      // {
      //   loader: 'ng-router-loader',
      //   options: {
      //     loader: 'async-import',
      //     genDir: 'compiled',
      //     aot: AOT
      //   }
      // },
      {
        loader: 'awesome-typescript-loader',
        options: {
          // Allow ES6 on the Server
          target: 'es6'
        }
      },
      {
        loader: 'angular2-template-loader'
      }
    ],
    exclude: [/\.(spec|e2e)\.ts$/]
  })

  // Ignore Alias
  config.externals = helpers.ignoreAlias(config)

  /*
   * Include polyfills or mocks for various node stuff
   * Description: Node configuration
   * See: https://webpack.github.io/docs/configuration.html#node
   */
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
