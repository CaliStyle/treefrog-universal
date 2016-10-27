'use strict'

import * as winston from 'winston'

module.exports = {

  main: {
    packs: [
      require('trailpack-core'),
      require('trailpack-router'),
      require('trailpack-express'),
      require('trailpack-treefrog'),
      require('trailpack-email'),
      require('trailpack-markdown-doc')
    ]
  },
  web: {
    cache: 0
  },
  log: {
    logger: new winston.Logger({
      level: 'info',
      exitOnError: false,
      transports: [
        new winston.transports.Console({
          timestamp: true
        }),
        new winston.transports.File({
          name: 'info-file',
          level: 'info',
          filename: 'trails-info.log',
          timestamp: true
        }),
        new winston.transports.File({
          name: 'error-file',
          level: 'error',
          filename: 'trails-error.log',
          timestamp: true
        })
      ]
    })
  }

}
