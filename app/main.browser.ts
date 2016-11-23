import 'angular2-universal-polyfills';
import '../polyfills/polyfills.browser';
import { NgModule, APP_ID, Inject } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { UniversalModule, isBrowser, isNode } from 'angular2-universal';
import { Title } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { CommonModule } from '@angular/common';

//ngrx modules
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DBModule } from '@ngrx/db';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

//Custom Services
import { CacheService } from './services/cache/universal-cache';
import { ApiService } from './services/api/api';

// Our Root Component
import { AppComponent } from './app.component';
//Custom Modules
import { LayoutsModule } from './layouts/layouts.module';
import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './components/components.module';


// Our Root routing & routingProviders
import { routing, appRoutingProviders } from './app.routes';

// Our Providers
import { BROWSER_LOG_PROVIDERS } from './services/log/browser';
import { BROWSER_EMAILER_PROVIDERS } from './services/emailer/browser';
// Browser Container (aka Module)
@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    // Standard imports
    UniversalModule,
    CommonModule,
    FormsModule,

    // Our imports
    routing,
    LayoutsModule,
    PagesModule,
    ComponentsModule,

  ],
  providers: [
    { provide: 'isBrowser', useValue: isBrowser },
    { provide: 'isNode', useValue: isNode },
    CacheService,
    ApiService,
    Title,
    appRoutingProviders,
    ...BROWSER_LOG_PROVIDERS,
    ...BROWSER_EMAILER_PROVIDERS
  ]
})
export class MainModule {
  constructor(public cache: CacheService) {}
}
