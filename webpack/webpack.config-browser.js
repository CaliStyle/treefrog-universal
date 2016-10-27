'use strict'
const path = require('path')
const helpers = require('./helpers')
/**
 * Treefrog Constants
 */
const treefrogConfig = require(helpers.root('treefrog.json'))
// const outDir = treefrogConfig.outDir
const srcDir = treefrogConfig.srcDir

module.exports = function(config) {
  config.target = 'web'
  config.entry = {
    browser: path.resolve(__dirname, helpers.root(srcDir + '/client'))
  }

  config.output.filename = srcDir + '/[name]-bundle.js'
  config.output.library = 'universal'
  config.output.libraryTarget = 'var'
  let isProd = false
  // This assumes that staging should act like production as well
  if (['dev','development','test','testing'].indexOf(process.env.NODE_ENV) == -1) {
    isProd = true
  }
  // Alow ES5 in the Browser
  config.module.rules.unshift({
    test: /\.(ts)$/,
    loaders: [
      'awesome-typescript-loader?' + JSON.stringify({target: 'es5'}),
      'angular2-template-loader'
    ].concat(isProd ? [] : '@angularclass/hmr-loader?pretty=' + !isProd + '&prod=' + isProd),
    exclude: [/node_modules/]
  })


  config.node = {
    global: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: false,
    module: false
  }

  return config
}
