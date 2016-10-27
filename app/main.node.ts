import { NgModule, Component, Injectable, Renderer } from '@angular/core';
import { UniversalModule, platformUniversalDynamic, createGlobalProxy } from 'angular2-universal';
import { platformNodeDynamic } from 'angular2-platform-node';

// Our Root Component
import { AppComponent } from './app.component';

import { LayoutsModule } from './layouts/layouts.module';
import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './components/components.module';
import { InterfacesModule } from './interfaces/interfaces.module';
import { DirectivesModule } from './directives/directives.module';

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
      InterfacesModule,
      DirectivesModule,

      // Trails Imports

    ],

    providers: [
      appRoutingProviders,
      ...NODE_LOG_PROVIDERS,
      ...NODE_EMAILER_PROVIDERS,

    ]
  })
export class MainModule {
  constructor() {
    createGlobalProxy();
  }
}
