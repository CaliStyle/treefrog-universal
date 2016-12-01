import { NgModule, Component, Injectable, Renderer } from '@angular/core';
import { UniversalModule, isBrowser, isNode, platformUniversalDynamic, createGlobalProxy } from 'angular2-universal';
import { CacheService } from './services/cache/universal-cache';
import { ApiService } from './services/api/api';
import { platformNodeDynamic } from 'angular2-platform-node';

//ngrx modules
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DBModule } from '@ngrx/db';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BookEffects } from './effects/book';
//import { CollectionEffects } from './effects/collection';
import { reducer } from './reducers';
//import { schema } from './db';

// Our Root Component
import { AppComponent } from './app.component';

import { LayoutsModule } from './layouts/layouts.module';
import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './components/components.module';

// Our Root routing & routingProviders
import { routing, appRoutingProviders} from './app.routes';
//ngrx google service

// Our Providers
import { NODE_LOG_PROVIDERS } from './services/log/node';
import { NODE_EMAILER_PROVIDERS } from './services/emailer/node';
import { NODE_GOOGLEBOOKS_PROVIDERS } from './services/google/node';

export const platform = platformNodeDynamic();

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

// Universal Container (aka Module)
@NgModule({
  // These are identical to the Browser NgModule (in main.browser.ts)
  bootstrap: [AppComponent],
  declarations: [
    AppComponent
  ],

  // As opposed to the normal "BrowserModule, HttpModule, JsonpModule" imports
  // in our Browser NgModule (found in main.browser.ts)
  // Here we need to import Node specific modules for Universal
  imports: [
    // Standard Imports

    // NodeModule from "@angular/universal" allows us to provide a config object
    UniversalModule,
    // Our Imports
    routing,
    LayoutsModule,
    PagesModule,
    ComponentsModule,

    //ngrx
    /**
      * StoreModule.provideStore is imported once in the root module, accepting a reducer
      * function or object map of reducer functions. If passed an object of
      * reducers, combineReducers will be run creating your application
      * meta-reducer. This returns all providers for an @ngrx/store
      * based application.
    */
    StoreModule.provideStore(reducer),

    /**
       * @ngrx/router-store keeps router state up-to-date in the store and uses
       * the store as the single source of truth for the router's state.
     */
    RouterStoreModule.connectRouter(),

    /**
      * Store devtools instrument the store retaining past versions of state
      * and recalculating new states. This enables powerful time-travel
      * debugging.
      *
      * To use the debugger, install the Redux Devtools extension for either
      * Chrome or Firefox
      *
      * See: https://github.com/zalmoxisus/redux-devtools-extension
      */
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    /**
      * EffectsModule.run() sets up the effects class to be initialized
      * immediately when the application starts.
      *
      * See: https://github.com/ngrx/effects/blob/master/docs/api.md#run
    */
    EffectsModule.run(BookEffects),
    //EffectsModule.run(CollectionEffects),
    /**
      * `provideDB` sets up @ngrx/db with the provided schema and makes the Database
      * service available.
    */
    //DBModule.provideDB(schema),


    // Trails Imports

  ],

  providers: [
    { provide: 'isBrowser', useValue: isBrowser },
    { provide: 'isNode', useValue: isNode },
    ApiService,
    CacheService,
    appRoutingProviders,
    ...NODE_LOG_PROVIDERS,
    ...NODE_EMAILER_PROVIDERS,
    ...NODE_GOOGLEBOOKS_PROVIDERS,
  ]
})
export class MainModule {
  constructor(
    public cache: CacheService
  ) {
    createGlobalProxy();
  }
  // we need to use the arrow function here to bind the context as this is a gotcha in Universal for now until it's fixed
  universalDoDehydrate = (universalCache) => {
    universalCache['Cache'] = JSON.stringify(this.cache.dehydrate());
  }
  universalAfterDehydrate = () => {
    this.cache.clear();
  }
}
