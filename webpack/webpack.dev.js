'use strict'

const helpers = require('./helpers')
const commonConfig = require('./webpack.common') // the settings that are common to prod and dev
const clone = require('js.clone')
const path = require('path')


/**
 * Treefrog Constants
 */
const treefrogConfig = require(helpers.root('treefrog.json'))
const outDir = treefrogConfig.outDir
const srcDir = treefrogConfig.srcDir

/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin')
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin')
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
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
  const ENV = process.env.NODE_ENV
  const HOST = process.env.HOST
  const PORT = process.env.PORT
  const HMR = helpers.hasProcessFlag('hot')
  const NON_WWW = process.env.NON_WWW
  const FORCE_HTTPS = process.env.FORCE_HTTPS
  const METADATA = {
    HOST: HOST,
    PORT: PORT,
    ENV: ENV,
    HMR: HMR,
    NON_WWW: NON_WWW,
    FORCE_HTTPS: FORCE_HTTPS,
    title: 'Cali Style Technologies',
    baseUrl: '/',
    isDevServer: helpers.isWebpackDevServer()
  }

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
    new CopyWebpackPlugin([
      { from: 'dll', to: srcDir }
    ]),
    new DllReferencePlugin({
      context: path.resolve(__dirname, helpers.root(srcDir)),
      manifest: require(helpers.root('dll/vendor-manifest.json'))
    }),
    /**
     * Plugin: HotModuleReplacementPlugin (experimental)
     * Description: Replaces Modules with changes at run time.
     */
    new HotModuleReplacementPlugin()
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
      // don't define plugins here. define them above in shared, browser, or server plugins
    ],

    /**
     * Webpack Development Server configuration
     * Description: The webpack-dev-server is a little node.js Express server.
     * The server emits information about the compilation state to the client,
     * which reacts to those events.
     *
     * See: https://webpack.github.io/docs/webpack-dev-server.html
     */
    devServer: {
      port: METADATA.PORT || 8080,
      host: METADATA.HOST || '0.0.0.0',
      historyApiFallback: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      },
      outputPath: helpers.root(outDir),
      proxy: {
        '/api/**': {
          target: `http://localhost:${ METADATA.PORT || '3000'}`,
          secure: false
        },
        '/node_modules/**': {
          target: `http://localhost:${ METADATA.PORT || '3000'}`,
          secure: false
        }
      }
    }
  }
  return [
    helpers.plugins(sharedPlugins.concat(browserPlugins), commonConfig(clone(webpackConfig))[0]), // Browser
    helpers.plugins(sharedPlugins.concat(serverPlugins), commonConfig(clone(webpackConfig))[1]) // Server
    //helpers.plugins(sharedPlugins.concat(serverPlugins), commonConfig(clone(webpackMerge(devServerWebpackConfig, webpackConfig)))[1]) // Server
  ]
}
