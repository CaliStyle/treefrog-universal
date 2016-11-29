import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { Pages404Component } from './404/404.component'
import { Pages500Component } from './500/500.component'
import { PagesAboutComponent } from './about/about.component'
import { PagesContactComponent } from './contact/contact.component'
import { PagesHomeComponent } from './home/home.component'
import { PagesCollectionComponent } from './book/collection-page'
import { PagesFindBookComponent } from './book/find-book-page'
import { PagesNotFoundComponent } from './book/not-found-page'
import { PagesSelectedBookComponent } from './book/selected-book-page'
import { PagesViewBookComponent } from './book/view-book-page'

import { SharedModule } from '../shared/shared.module'
import { RouterModule }   from '@angular/router';
import { LayoutsModule } from '../layouts/layouts.module'

export const PAGES = [
  Pages404Component,
  Pages500Component,
  PagesAboutComponent,
  PagesContactComponent,
  PagesHomeComponent,
  PagesCollectionComponent,
  PagesFindBookComponent,
  PagesNotFoundComponent,
  PagesSelectedBookComponent,
  PagesViewBookComponent
];

@NgModule({
    imports : [
        RouterModule,
        MaterialModule,
        SharedModule,
        LayoutsModule
    ],
    declarations: PAGES,
    exports: PAGES
})
export class PagesModule {}
