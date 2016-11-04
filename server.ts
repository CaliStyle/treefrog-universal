//import './polyfills/polyfills.node';
import 'angular2-universal-polyfills';

import { enableProdMode } from '@angular/core';
// Enable production mode
enableProdMode();

import { TrailsApp } from 'trails-api';
const app = require('./');
const server = new TrailsApp(app);

server.start().catch((err: any) => server.stop(err));
