'use strict'
// Built by api/utils/AngularUtils
import { BookExistsGuard } from './guards/book-exists';
import { PagesFindBookComponent } from './pages/book/find-book-page';
import { PagesViewBookComponent } from './pages/book/view-book-page';
import { PagesCollectionComponent } from './pages/book/collection-page';
import { PagesNotFoundComponent } from './pages/book/not-found-page';

export const defaultRoutes = [
  {path: '', component: PagesCollectionComponent, data: {}},
  {path: 'book/find', component: PagesFindBookComponent, data: {}},
  {path: 'book/:id', canActivate: [BookExistsGuard], component: PagesViewBookComponent, data: {}},
  {path: '**', name:'NotFound', component: PagesNotFoundComponent, data: {}}
];
