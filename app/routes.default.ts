'use strict'
// Built by api/utils/AngularUtils

import { PagesContactComponent } from './pages/contact/contact.component';
import { PagesAboutComponent } from './pages/about/about.component';
import { PagesHomeComponent } from './pages/home/home.component';
import { Pages404Component } from './pages/404/404.component';
import { Pages500Component } from './pages/500/500.component';

export const defaultRoutes = [
  {path: '', name:'Home', component: PagesHomeComponent, data: {}},
  {path: 'contact', name:'Contact', component: PagesContactComponent, data: {}},
  {path: 'about', name:'About', component: PagesAboutComponent, data: {}},
  {path: '500', name: 'ServerError', component: Pages500Component, data: {}},
  {path: '404', name: 'NotFound', component: Pages404Component, data: {}},
  {path: '**', name:'NotFound', component: Pages404Component, data: {}}
];
