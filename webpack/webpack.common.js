'use strict'
/**
 * Packages Constants
 */
const path = require('path')
const clone = require('js.clone')
const helpers = require('./helpers')
const browserConfig = require('./webpack.config-browser')
const serverConfig = require('./webpack.config-server')
const webpackMerge = require('webpack-merge')
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin')
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin')
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin

const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

/**
 * Treefrog Constants
 */
const treefrogConfig = require(helpers.root('treefrog.json'))
const outDir = treefrogConfig.outDir
const srcDir = treefrogConfig.srcDir

module.exports = function(envConfig) {

  const sharedPlugins = [

    new ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      helpers.root(srcDir)
    ),
    new TsConfigPathsPlugin({
      tsconfig: helpers.root('./tsconfig.json')
    }),
    new ForkCheckerPlugin(),

    new LoaderOptionsPlugin({
      options: {
        sassLoader: {
          context: __dirname,
          includePaths: [
            'node_modules/font-awesome/scss',
            'node_modules/treefrog/scss',
            path.resolve(__dirname, helpers.root(srcDir + '/style/scss/app'))
          ]
        },
        tslint: {
          emitErrors: true,
          failOnHint: true,
          resourcePath: srcDir
        }
      }
    })
  ]

  const browserPlugins = []

  const serverPlugins = [
    new CleanWebpackPlugin([outDir], {
      root: helpers.root('./'),
      verbose: true,
      dry: helpers.isWebpackDevServer() ? true : false
    }),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, helpers.root(srcDir + '/style')), to: srcDir + '/style' },
      { from: path.resolve(__dirname, helpers.root(srcDir + '/static')), to: srcDir + '/static' }
    ], {
      ignore: [
      // Doesn't copy any files with a md or scss extension
        '*.md',
        '*.scss'
      ]
    })
  ]

  let webpackConfig = helpers.setTypeScriptAlias(require(helpers.root('./tsconfig.json')), {

    cache: true,

    devtool: 'source-map',

    output: {
      filename: '[name]-bundle.js',
      path: helpers.root(outDir)
    },

    module: {
      rules: [
        {
          test: /\.jpg$/,
          loader: 'file'
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.html$/,
          loader: 'raw-loader'
        },
        {
          test: /\.css$/,
          loader: ['raw-loader']
        },
        // Handle all normal cases
        {
          test: /\.scss$/,
          loaders: ['raw-loader', 'sass-loader']
        }
      ]
    },

    plugins: [
      // don't define plugins here. define them above in shared plugins
    ],

    resolve: {
      extensions: ['.ts', '.js', '.json']
    }
  })

  webpackConfig = webpackMerge.smart(webpackConfig, envConfig)

  return [
    helpers.plugins(sharedPlugins.concat(browserPlugins), browserConfig(clone(webpackConfig))),
    helpers.plugins(sharedPlugins.concat(serverPlugins), serverConfig(clone(webpackConfig)))
  ]

}
