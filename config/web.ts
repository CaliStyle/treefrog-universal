const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

import { createEngine, ExpressEngineConfig } from 'angular2-express-engine';
import { MainModule } from '../app/main.node';

/**
 * Server Configuration
 * (app.config.web)
 *
 * Configure the Web Server
 *
 * @see {@link http://trailsjs.io/doc/config/web}
 */
module.exports = {
  express: express,

  /**
   * CORS options
   * Can be true/false or an object of CORS options
   * @see {@link https://github.com/expressjs/cors#configuring-cors}
   */
  cors: false,

  /**
   * Middlewares to load (in order)
   */
  middlewares: {

    //middlewares loading order
    order: [
      // 'redirect',
      'nonWww',
      'https',
      'static',
      'addMethods',
      'cookieParser',
      'session',
      'passportInit',
      'passportSession',
      'bodyParser',
      'compression',
      'methodOverride',
      'poweredBy',
      'www',
      'router',
      '404',
      '500'
    ],
    /**
     * Middlewares to load for body parsing
     */
    // bodyParser: [
    //   bodyParser.json(),
    //   bodyParser.urlencoded({extended: false})
    // ]
    bodyParser: bodyParser.json(),
    cookieParser: cookieParser('Angular 2 Universal'),
    compression: require('compression')({
      level: 9,
      threshold: 4096
    }),
    poweredBy: function(req, res, next) {
      res.set('X-Powered-By', 'Treefrog <cali-style.com>')
      next()
    },
    // redirect: function(app, next) {
    //   redirect(app)
    //   app.redirect('/cali-style.php?Action=2&k=node.js-development-company', '/', 301);
    //   next()
    // },
    nonWww: function(req, res, next) {
      // console.log("ENV NON_WWW", process.env.NON_WWW, req.host)
      if (process.env.NON_WWW && req.host.match(/^www/) !== null ) {
        if (process.env.FORCE_HTTPS) {
          if (req.headers['x-forwarded-proto'] !== 'https') {
            return res.redirect('https://' + req.host.replace(/^www\./, '') + req.url)
          }
        }
        else {
          return res.redirect('http://' + req.host.replace(/^www\./, '') + req.url)
        }
      }
      next()
    },
    https: function(req, res, next){
      // console.log("ENV FORCE_HTTPS", process.env.FORCE_HTTPS, req.headers['x-forwarded-proto'])
      if (process.env.FORCE_HTTPS) {
        if (req.headers['x-forwarded-proto'] !== 'https') {
          return res.redirect('https://' + req.host + req.url)
        }
      }
      next()
    },
    static: express.static('dist/app/static')

  },

  /***************************************************************************
   *                                                                          *
   * The number of seconds to cache flat files on disk being served by        *
   * Express static middleware (by default, these files are in `.tmp/public`) *
   *                                                                          *
   * The HTTP static cache is only active in a 'production' environment,      *
   * since that's the only time Express will cache flat-files.                *
   *                                                                          *
   ***************************************************************************/

  cache: 31557600000,

  /**
   * The host to bind the web server to
   */

  host: process.env.HOST || '0.0.0.0',
  /**
   * The port to bind the web server to
   */
   // We have to Remove this for Webpack Heroku
  // port: process.env.PORT,

  /**
   * Alternate method to add multiple template engine, for single view template use config.views.engine
   */
  views: {
    engines: {
      'ng2.html': createEngine({
        precompile: true,
        ngModule: MainModule
      })
    },
    // engines: {
    //   'ng2.html': 'html'
    // },
    path: require('../treefrog.json').outDir
  }

  /**
   * SSL options
   * Cert and key or pfx to create HTTPS server
   */
  /*
  ssl: {
    key: fs.readFileSync('path/to/private.key'),
    cert: fs.readFileSync('path/to/certificate.pem')
    //OR pfx: fs.readFileSync('path/to/server.pfx')
  },
   */
  /**
   * Automatically redirect HTTP to HTTPS
   * Create an HTTP server who redirect to HTTPS server
   * Work only if SSL is enabled
   */
  //redirectToHttps: false,

  /**
   * Http port to use if you want to enable http and https
   * SSL need to be enabled
   */
  //portHttp: 80
}
