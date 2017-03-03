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
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin
// const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin

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
    // Context Replacement Plugin
    new ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      helpers.root(srcDir)
    ),
    // TsConfig Paths Plugin
    new TsConfigPathsPlugin({
      tsconfig: helpers.root('./tsconfig.json')
    }),
    // Fork Checker
    new CheckerPlugin(),
    // new ForkCheckerPlugin(),
    // Loader Options Plugin
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

  // Browser Specific common plugins
  const browserPlugins = []

  // Server Specific common plugins
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

  // Establish webpack common config, set TypeScript alias as common
  let webpackConfig = helpers.setTypeScriptAlias(require(helpers.root('./tsconfig.json')), {

    cache: true,

    devtool: 'source-map',

    output: {
      filename: '[name]-bundle.js',
      path: helpers.root(outDir)
    },
    /*
     * Options affecting the resolving of modules.
     * See: http://webpack.github.io/docs/configuration.html#resolve
     */
    resolve: {
      extensions: ['.ts', '.js', '.json'],
      modules: [helpers.root(srcDir), helpers.root('node_modules')]
    },
    /*
     * Options affecting the normal modules.
     * See: http://webpack.github.io/docs/configuration.html#module
     */
    module: {
      rules: [
        /*
         * File loader for supporting images, for example, in CSS files.
         */
        {
          test: /\.(jpg|png|gif)$/,
          loader: 'file-loader'
        },
        /*
         * File loader for supporting fonts, for example, in CSS files.
         */
        {
          test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,
          use: 'file-loader'
        },
        /*
         * Json loader support for *.json files.
         * See: https://github.com/webpack/json-loader
         */
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        /* Raw loader support for *.html
         * Returns file content as string
         * See: https://github.com/webpack/raw-loader
         */
        {
          test: /\.html$/,
          loader: 'raw-loader'
        },
        /* Raw loader support for *.css
         * Returns file content as string
         * See: https://github.com/webpack/raw-loader
         */
        {
          test: /\.css$/,
          loader: ['raw-loader']
        },
        /*
         * sass loader support for *.scss files (from Angular components)
         * Returns compiled css content as string
         */
        {
          test: /\.scss$/,
          loaders: ['raw-loader', 'sass-loader']
        }
        /*
         * TypeScript is loaded per browser or server
         */
      ]
    },

    plugins: [
      // don't define plugins here. define them above in shared plugins
    ]
  })

  webpackConfig = webpackMerge.smart(webpackConfig, envConfig)

  return [
    helpers.plugins(sharedPlugins.concat(browserPlugins), browserConfig(clone(webpackConfig))),
    helpers.plugins(sharedPlugins.concat(serverPlugins), serverConfig(clone(webpackConfig)))
  ]

}
