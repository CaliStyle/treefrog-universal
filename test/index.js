'use strict'
//
before(done => {
  global.app = require('../dist/server/test-bundle').server
  return global.app.start().then(() => {
    done()
  }).catch(err => {
    done()
    return global.app.stop(err)
  })
})

after(() => {
  return global.app.stop()
})
