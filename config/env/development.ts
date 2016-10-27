'use strict'

import * as winston from 'winston'

module.exports = {
  main: {
    packs: [
      require('trailpack-core'),
      require('trailpack-repl'),
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
      level: 'debug',
      exitOnError: false,
      transports: [
        new winston.transports.Console({
          timestamp: true
        })
      ]
    })
  }
}
