/**
 * Trailpack Configuration
 * (app.config.main)
 *
 * @see http://trailsjs.io/doc/config/main
 */

'use strict'

const path = require('path')
const treefrogConfig = require('../treefrog.json')
const outDir = treefrogConfig.outDir
const srcDir = treefrogConfig.srcDir

module.exports = {

  /**
   * Order does *not* matter. Each module is loaded according to its own
   * requirements.
   */
  packs: [
    require('trailpack-core'),
    require('trailpack-router'),
    require('trailpack-express'),
    require('trailpack-treefrog'),
    require('trailpack-email'),
  ],

  /**
   * Define application paths here. "root" is the only required path.
   */
  paths: {
    root: path.resolve(__dirname, '..'),
    temp: path.resolve(__dirname, '..', outDir),
    www: path.resolve(__dirname, '..', outDir)
  }
}
