'use strict'

// console.log(process.env.NODE_ENV, process.env.HOST, process.env.PORT)

switch (process.env.NODE_ENV) {
case 'prod':
case 'production':
  module.exports = require('./webpack/webpack.prod')({
    env: 'production'
  })
  break
case 'staging':
  module.exports = require('./webpack/webpack.staging')({
    env: 'staging'
  })
  break
case 'test':
case 'testing':
  module.exports = require('./webpack/webpack.test')({
    env: 'testing'
  })
  break
case 'dev':
case 'development':
default:
  module.exports = require('./webpack/webpack.dev')({
    env: 'development'
  })
}
