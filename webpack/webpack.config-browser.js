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
  // Constants
  const nodeEnv = process.env.NODE_ENV

  // Set Target
  config.target = 'web'

  // Set Entry
  config.entry = {
    browser: path.resolve(__dirname, helpers.root(srcDir + '/client'))
  }

  // Set Output
  config.output.filename = srcDir + '/[name]-bundle.js'
  config.output.library = 'universal'
  config.output.libraryTarget = 'var'

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
          // Allow ES5 on the Browser
          target: 'es5'
        }
      },
      {
        loader: 'angular2-template-loader'
      }
    ],
    exclude: [/\.(spec|e2e)\.ts$/]
  })

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
    Buffer: false,
    module: false
  }

  return config
}
