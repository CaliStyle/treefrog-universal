import { platformUniversalDynamic } from 'angular2-universal';

import { enableProdMode } from '@angular/core';
enableProdMode();

// import { main as ngApp } from './main.browser';
import { MainModule } from './main.browser';

const platformRef = platformUniversalDynamic();
document.addEventListener('DOMContentLoaded', () => {

  platformRef.bootstrapModule(MainModule);

});
