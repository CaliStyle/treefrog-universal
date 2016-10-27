import '../polyfills/polyfills.browser';
import { enableProdMode } from '@angular/core';
enableProdMode();
import { main as ngApp } from './main.browser';

var _win: any = window;

_win.bootstrap = function bootstrap() {
  console.time('Client Bootstrap Time:');
  ngApp().then(() => {
    console.timeEnd('Client Bootstrap Time:');
  });
}


if (document.readyState === 'complete') {
  _win.bootstrap();
} else {
  document.addEventListener('DOMContentLoaded', _win.bootstrap);
}
