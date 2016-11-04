'use strict'

const helpers = require('./helpers')
const clone = require('js.clone')
const webpackMerge = require('webpack-merge') // used to merge webpack configs
const commonConfig = require('./webpack.common') // the settings that are common to prod and dev

/**
 * Treefrog Constants
 */
const treefrogConfig = require(helpers.root('treefrog.json'))
//  const outDir = treefrogConfig.outDir
const srcDir = treefrogConfig.srcDir

/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin')
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin')
const WebpackMd5Hash = require('webpack-md5-hash')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = function(options) {
  /**
   * Webpack Constants
   */
  const ENV = process.env.NODE_ENV = process.env.ENV = options.env
  const HOST = process.env.HOST
  const PORT = process.env.PORT
  const NON_WWW = process.env.NON_WWW
  const FORCE_HTTPS = process.env.FORCE_HTTPS
  const METADATA = webpackMerge(commonConfig({env: ENV})[1].metadata, {
    HOST: HOST,
    PORT: PORT,
    ENV: ENV,
    HMR: false,
    NON_WWW: NON_WWW,
    FORCE_HTTPS: FORCE_HTTPS
  })

  const sharedPlugins = [
    /**
     * Plugin: WebpackMd5Hash
     * Description: Plugin to replace a standard webpack chunkhash with md5.
     *
     * See: https://www.npmjs.com/package/webpack-md5-hash
     */
    new WebpackMd5Hash(),

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
        'NODE_ENV': JSON.stringify(METADATA.ENV),
        'PORT': METADATA.PORT,
        'HOST': JSON.stringify(METADATA.HOST),
        'HMR': METADATA.HMR,
        'NON_WWW': METADATA.NON_WWW,
        'FORCE_HTTPS': METADATA.FORCE_HTTPS
      }
    })
  ]
  const browserPlugins = [
    /*
      * Plugin: HtmlWebpackPlugin
      * Description: Simplifies creation of HTML files to serve your webpack bundles.
      * This is especially useful for webpack bundles that include a hash in the filename
      * which changes every compilation.
      *
      * See: https://github.com/ampedandwired/html-webpack-plugin
      */
    new HtmlWebpackPlugin({
      template: `${srcDir}/index.ng2.html`,
      filename: 'index.ng2.html',
      title: METADATA.title,
      chunksSortMode: 'dependency',
      metadata: METADATA,
      inject: 'head'
    }),
    /**
     * Plugin: UglifyJsPlugin
     * Description: Minimize all JavaScript output of chunks.
     * Loaders are switched into minimizing mode.
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
     */
    // NOTE: To debug prod builds uncomment //debug lines and comment //prod lines
    new UglifyJsPlugin({
      // beautify: true, //debug
      // mangle: false, //debug
      // comments: false
      // dead_code: false, //debug
      // unused: false, //debug
      // deadCode: false, //debug
      // compress: {
      //   screw_ie8: true,
      //   keep_fnames: true,
      //   drop_debugger: false,
      //   dead_code: false,
      //   unused: false
      // }, // debug
      // comments: true //debug

      beautify: false, //prod
      mangle: { screw_ie8: true, keep_fnames: true }, //prod
      compress: { screw_ie8: true }, //prod
      comments: false //prod
    })
  ]
  const serverPlugins = [
  ]

  const webpackConfig = {
    /**
     * Developer tool to enhance debugging
     *
     * See: http://webpack.github.io/docs/configuration.html#devtool
     * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
     */
    devtool: 'source-map',

    /**
     * Add additional plugins to the compiler.
     *
     * See: http://webpack.github.io/docs/configuration.html#plugins
     */
    plugins: [
      // don't define plugins here. define them above in shared plugins
    ],

    /*
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.github.io/docs/configuration.html#node
     */
    // node: {
    //   global: 'window',
    //   crypto: 'empty',
    //   process: false,
    //   module: false,
    //   clearImmediate: false,
    //   setImmediate: false
    // }
  }

  return [
    helpers.plugins(sharedPlugins.concat(browserPlugins), commonConfig(clone(webpackConfig))[0]), // Browser
    helpers.plugins(sharedPlugins.concat(serverPlugins), commonConfig(clone(webpackConfig))[1]) // Server
  ]
}
