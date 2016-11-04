'use strict'

const helpers = require('./helpers')
const webpackMerge = require('webpack-merge') // used to merge webpack configs
const commonConfig = require('./webpack.common') // the settings that are common to prod and dev
const clone = require('js.clone')

/**
 * Treefrog Constants
 */
const treefrogConfig = require(helpers.root('treefrog.json'))
// const outDir = treefrogConfig.outDir
const srcDir = treefrogConfig.srcDir

/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin')
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function(options) {

  /**
   * Webpack Constants
   */
  const ENV = process.env.NODE_ENV = process.env.ENV = options.env
  const HOST = process.env.HOST
  const PORT = process.env.PORT
  const NON_WWW = process.env.NON_WWW
  const FORCE_HTTPS = process.env.FORCE_HTTPS
  const HMR = helpers.hasProcessFlag('hot')
  const METADATA = webpackMerge(commonConfig({env: ENV})[1].metadata, {
    HOST: HOST,
    PORT: PORT,
    ENV: ENV,
    HMR: HMR,
    NON_WWW: NON_WWW,
    FORCE_HTTPS: FORCE_HTTPS
  })

  const sharedPlugins = [
    /**
     * Plugin: DefinePlugin
     * Description: Define free variables.
     * Useful for having development builds with debug logging or adding global constants.
     *
     * Environment helpers
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
     */
    new DefinePlugin({
      'ENV': JSON.stringify(METADATA.ENV),
      'HMR': METADATA.HMR,
      'process.env': {
        'ENV': JSON.stringify(METADATA.ENV),
        'HMR': METADATA.HMR
      }
    }),
    /**
     * Plugin: HotModuleReplacementPlugin (experimental)
     * Description: Replaces Modules with changes at run time.
     */
    new HotModuleReplacementPlugin()
  ]

  const browserPlugins = [
    new HtmlWebpackPlugin({
      template: `${srcDir}/index.ng2.html`,
      filename: 'index.ng2.html',
      title: METADATA.title,
      chunksSortMode: 'dependency',
      metadata: METADATA,
      inject: 'head'
    })
  ]

  const serverPlugins = []

  const webpackConfig = {
    /**
     * Developer tool to enhance debugging
     *
     * See: http://webpack.github.io/docs/configuration.html#devtool
     * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
     */
    devtool: 'cheap-module-source-map',

    plugins: [
      // don't define plugins here. define them above in shared plugins
    ]
  }
  return [
    helpers.plugins(sharedPlugins.concat(browserPlugins), commonConfig(clone(webpackConfig))[0]), // Browser
    helpers.plugins(sharedPlugins.concat(serverPlugins), commonConfig(clone(webpackConfig))[1]) // Server
  ]
}
