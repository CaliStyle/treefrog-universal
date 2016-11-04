'use strict'

// const prefix = require('./footprints').prefix

/**
 * Routes Configuration
 * (trails.config.routes)
 *
 * Configure how routes map to views and controllers.
 *
 * @see http://trailsjs.io/doc/config/routes.js
 */

'use strict'

module.exports = [

  /**
   * Render the HelloWorld view
   */
  {
    method: [ 'GET' ],
    path: '/*',
    handler: 'ViewController.index',
    config: {

    }
  },
  {
    method: [ 'GET' ],
    path: '/',
    handler: 'ViewController.index',
    config: {
      app: {}
    }
  },
  {
    method: [ 'GET' ],
    path: '/about',
    handler: 'ViewController.index',
    config: {

    }
  },
  {
    method: [ 'GET' ],
    path: '/about:route',
    handler: 'ViewController.index',
    config: {

    }
  },
  {
    method: [ 'GET' ],
    path: '/blog',
    handler: 'ViewController.index',
    config: {

    }
  },
  {
    method: [ 'GET' ],
    path: '/blog/:route',
    handler: 'ViewController.index',
    config: {

    }
  },
  {
    method: [ 'GET' ],
    path: '/capabilities',
    handler: 'ViewController.index',
    config: {

    }
  },
  {
    method: [ 'GET' ],
    path: '/capabilities/:route',
    handler: 'ViewController.index',
    config: {

    }
  },
  {
    method: [ 'GET' ],
    path: '/contact',
    handler: 'ViewController.index',
    config: {

    }
  },
  {
    method: [ 'GET' ],
    path: '/jobs',
    handler: 'ViewController.index',
    config: {

    }
  },
  {
    method: [ 'GET' ],
    path: '/jobs/:route',
    handler: 'ViewController.index',
    config: {

    }
  },
  {
    method: [ 'GET' ],
    path: '/showcase',
    handler: 'ViewController.index',
    config: {

    }
  },
  {
    method: [ 'GET' ],
    path: '/showcase/:route',
    handler: 'ViewController.index',
    config: {

    }
  },

  /**
   * Allow GET Access to Node Modules
  */
  {
    method: [ 'GET' ],
    path: '/node_modules',
    handler: {
      directory: {
        path: 'node_modules'
      }
    }
  },

  /**
   * Constrain the DefaultController.info handler to accept only GET requests.
   */
  {
    method: [ 'GET' ],
    path: '/api/v1/default/info',
    handler: 'DefaultController.info'
  },
  /**
   * Content Server for Angular Routes.
   */
  {
    method: [ 'GET' ],
    path: '/api/v1/route/getRoute',
    handler: 'RouteController.getRoute'
  },
  {
    method: [ 'POST' ],
    path: '/api/v1/email/send',
    handler: 'EmailController.send'
  }
]
