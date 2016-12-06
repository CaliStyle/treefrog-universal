'use strict'

const path = require('path')
const webpack = require('webpack')
const helpers = require('./helpers')

module.exports = {
  entry: {
    vendor: [
      '@angular/common',
      '@angular/compiler',
      '@angular/core',
      '@angular/forms',
      '@angular/http',
      '@angular/platform-browser',
      '@angular/platform-browser-dynamic',
      '@angular/platform-server',
      '@angular/router',
      '@angular/material',
      '@ngrx/core',
      '@ngrx/core/add/operator/select.js',
      '@ngrx/effects',
      '@ngrx/router-store',
      '@ngrx/store',
      '@ngrx/store-devtools',
      '@ngrx/db',
      '@ngrx/store-log-monitor',
      'ngrx-store-freeze',
      'ngrx-store-logger',
      'rxjs'
    ]
  },
  output: {
    path: path.resolve(__dirname, helpers.root('dll')),
    filename: '[name].dll.js',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, helpers.root('dll', '[name]-manifest.json')),
      name: '[name]'
    })
  ]
}
