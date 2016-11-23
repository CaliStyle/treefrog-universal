import { NgModule, Component, Injectable, Renderer } from '@angular/core';
import { UniversalModule, isBrowser, isNode, platformUniversalDynamic, createGlobalProxy } from 'angular2-universal';
import { CacheService } from './services/cache/universal-cache';
import { ApiService } from './services/api/api';
import { platformNodeDynamic } from 'angular2-platform-node';

// Our Root Component
import { AppComponent } from './app.component';

import { LayoutsModule } from './layouts/layouts.module';
import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './components/components.module';
import { ReducersModule } from './reducers/reducers.module';
import { EffectsModule } from './effects/effects.module';

// Our Root routing & routingProviders
import { routing, appRoutingProviders} from './app.routes';

// Our Providers
import { NODE_LOG_PROVIDERS } from './services/log/node';
import { NODE_EMAILER_PROVIDERS } from './services/emailer/node';

export const platform = platformNodeDynamic();

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

  // Universal Container (aka Module)
  @NgModule({
    // These are identical to the Browser NgModule (in main.browser.ts)
    bootstrap    : [ AppComponent ],
    declarations : [
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
      ReducersModule,
      EffectsModule,

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
