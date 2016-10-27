// Type definitions for trails
// Project: https://github.com/trailsjs/trails
// Definitions by: scott wyatt <https://github.com/scott-wyatt>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

// import * as events from 'events';

// declare module "trails" {
//   export class TrailsApp {
//     routes: { path: string, config: {app?: any} }[];
//     services: any;
//     sitemap: any;
//
//     pkg: any;
//     config: any;
//     api: any;
//     env: any;
//     versions: any;
//     _trails: any;
//     packs: any;
//     loadedPacks: any;
//     loadedModules: any;
//     bound: any;
//     started: any;
//     stopped: any;
//     timers: any;
//     constructor(app: any);
//
//     start(app?): any;
//     stop(err?): any;
//     emit(event?): any;
//     onceAny(events, handler?): any;
//     after(events): any;
//   }
// }


// import * as events from 'events';
//
// interface TrailsAppOptions {
//   pkg: any;
//   config: any;
//   api: any;
//   env: any;
//   versions: any;
//   _trails: any;
//   packs: any;
//   loadedPacks: any;
//   loadedModules: any;
//   bound: any;
//   started: any;
//   stopped: any;
//   timers: any;
//
// }
//
// declare module TrailsApp {
//   export class TrailsApp {
//     constructor(app: any);
//   }
// }
// declare module "trails" {
//   export = TrailsApp;
// }
//
// declare var trails:any;
// declare module "trails" {
//   export = trails;
// }


// declare module "trails" {
//
//   import * as events from 'events';
//
//   export var TrailsApp: TrailsAppStatic;
//
//   export interface TrailsAppOptions {
//     routes: { path: string, config: {app?: any} }[];
//     services: any;
//     sitemap: any;
//
//     pkg: any;
//     config: any;
//     api: any;
//     env: any;
//     versions: any;
//     _trails: any;
//     packs: any;
//     loadedPacks: any;
//     loadedModules: any;
//     bound: any;
//     started: any;
//     stopped: any;
//     timers: any;
//     constructor(app: any);
//   }
//
//   export interface TrailsAppStatic {
//     new (options: TrailsAppOptions): TrailsAppInstance;
//   }
//
//   export interface TrailsAppInstance extends events.EventEmitter {
//     start(app?): any;
//     stop(err?): any;
//     emit(event): any;
//     onceAny(events, handler?): any;
//     after(events): any;
//   }
// }


// declare namespace trails {
//   class TrailsApp {
//
//     routes: { path: string, config: {app?: any} }[];
//     services: any;
//     sitemap: any;
//
//     pkg: any;
//     config: any;
//     api: any;
//     env: any;
//     versions: any;
//     _trails: any;
//     packs: any;
//     loadedPacks: any;
//     loadedModules: any;
//     bound: any;
//     started: any;
//     stopped: any;
//     timers: any;
//     constructor(app: any);
//
//     start(app?): any;
//     stop(err?): any;
//     emit(event?): any;
//     onceAny(events, handler?): any;
//     after(events): any;
//   }
// }
//
// declare module "trails" {
//   export = trails;
// }
