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
  database: {
    stores: {
      sqlite: {
        database: 'calistyle',
        storage: './test/test.sqlite',
        host: '127.0.0.1',
        dialect: 'sqlite',
        logging: false
      }
    },

    models: {
      defaultStore: 'sqlite',
      migrate: 'drop'
    }
  },
  log: {
    logger: new winston.Logger({
      level: 'info',
      exitOnError: false,
      transports: [
        new winston.transports.Console({
          timestamp: true
        })
      ]
    })
  }

}
