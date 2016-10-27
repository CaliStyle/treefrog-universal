import { NgModule, APP_ID, Inject } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { UniversalModule, isBrowser, platformUniversalDynamic } from 'angular2-universal';
import { Title } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { CommonModule } from '@angular/common';



// Our Root Component
import { AppComponent } from './app.component';
//Custom Modules
import { LayoutsModule } from './layouts/layouts.module';
import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './components/components.module';
import { InterfacesModule } from './interfaces/interfaces.module';
import { DirectivesModule } from './directives/directives.module';

// Our Root routing & routingProviders
import { routing, appRoutingProviders } from './app.routes';

// Our Providers
import { BROWSER_LOG_PROVIDERS } from './services/log/browser';
import { BROWSER_EMAILER_PROVIDERS } from './services/emailer/browser';


export const platform = platformUniversalDynamic();

export function main() {
  // Browser Container (aka Module)
  @NgModule({
    bootstrap    : [ AppComponent ],
    declarations : [
      AppComponent
    ],
    imports : [
      // Standard imports
      UniversalModule,
      CommonModule,
      FormsModule,

      // Our imports
      routing,
      LayoutsModule,
      PagesModule,
      ComponentsModule,
      InterfacesModule,
      DirectivesModule,

    ],
    providers: [
      Title,
      appRoutingProviders,
      ...BROWSER_LOG_PROVIDERS,
      ...BROWSER_EMAILER_PROVIDERS
    ]
  })
  class MainModule {}
  // Create our browser "platform"
  // & Bootstrap our NgModule/Container to it
  console.log('isBrowser', isBrowser);
  // browserPlatform bootstrap
  return platform.bootstrapModule(MainModule);
}
