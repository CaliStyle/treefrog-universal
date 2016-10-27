import '../polyfills/polyfills.node';

import { enableProdMode } from '@angular/core';
// Enable production mode
enableProdMode();

// const app = require('../')
// const TrailsApp = require('trails')
// const server = new TrailsApp(app)

import { TrailsApp } from 'trails-api';
const app = require('../');
module.exports.server = new TrailsApp(app);
