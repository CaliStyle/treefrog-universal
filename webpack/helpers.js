'use strict'

const path = require('path')
const clone = require('js.clone')

// Helper functions
const ROOT = path.resolve(__dirname, '..')

function hasProcessFlag(flag) {
  return process.argv.join('').indexOf(flag) > -1
}

function isWebpackDevServer() {
  return process.argv[1] && !! (/webpack-dev-server/.exec(process.argv[1]))
}

function root(args) {
  args = Array.prototype.slice.call(arguments, 0)
  return path.join.apply(path, [ROOT].concat(args))
}

function plugins(plugins, config) {
  config.plugins = config.plugins.concat(plugins)
  return config
}

function setTypeScriptAlias(tsConfig, config) {
  let newConfig = clone(config)
  newConfig = newConfig || {}
  newConfig.resolve = newConfig.resolve || {}
  newConfig.resolve.alias = newConfig.resolve.alias || {}
  const tsPaths = tsConfig.compilerOptions.paths
  for (const prop in tsPaths) {
    newConfig.resolve.alias[prop]  = root(tsPaths[prop][0])
  }
  return newConfig
}

function ignoreAlias (config, log) {
  if (!config) return
  let aliass = []
  if (Array.isArray(config)) {
    aliass = config
  }
  else if (('resolve' in config) && ('alias' in config.resolve)) {
    aliass = Object.keys(config.resolve.alias)
  }

  return function (context, request, cb) {
    if (aliass.includes(request)) {
      if (log) {
        // console.log('resolve.alias', request)
      }
      return cb()
    }
    return checkNodeImport(context, request, cb)
  }
}

function checkNodeImport(context, request, cb) {
  if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
    return cb(null, 'commonjs ' + request)
  }
  return cb()
}

exports.plugins = plugins
exports.setTypeScriptAlias = setTypeScriptAlias
exports.hasProcessFlag = hasProcessFlag
exports.isWebpackDevServer = isWebpackDevServer
exports.root = root
exports.ignoreAlias = ignoreAlias
exports.checkNodeImport = checkNodeImport
