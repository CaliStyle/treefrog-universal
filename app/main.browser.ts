import 'angular2-universal-polyfills';
import '../polyfills/polyfills.browser';
import 'hammerjs';
import { NgModule, APP_ID, Inject } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { UniversalModule, isBrowser, isNode } from 'angular2-universal';
import { Title } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { CommonModule } from '@angular/common';

//Custom Services
import { CacheService } from './services/cache/universal-cache';
import { ApiService } from './services/api/api';

// Our Root Component
import { AppComponent } from './app.component';
//Custom Modules
import { LayoutsModule } from './layouts/layouts.module';
import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './components/components.module';

//ngrx modules
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DBModule } from '@ngrx/db';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BookEffects } from './effects/book';
//import { CollectionEffects } from './effects/collection';
import { reducer } from './reducers/index';
//import { schema } from './db';

// Our Root routing & routingProviders
import { routing, appRoutingProviders } from './app.routes';

// Our Providers
import { BROWSER_LOG_PROVIDERS } from './services/log/browser';
import { BROWSER_EMAILER_PROVIDERS } from './services/emailer/browser';
import { BROWSER_GOOGLEBOOKS_PROVIDERS } from './services/google/browser';
import { BookExistsGuard } from './guards/book-exists';
// Browser Container (aka Module)
@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    // Standard imports
    UniversalModule,
    CommonModule,
    FormsModule,

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
    BookExistsGuard,
    Title,
    appRoutingProviders,
    ...BROWSER_LOG_PROVIDERS,
    ...BROWSER_EMAILER_PROVIDERS,
    ...BROWSER_GOOGLEBOOKS_PROVIDERS,
  ]
})
export class MainModule {
  constructor(public cache: CacheService) { }
}
