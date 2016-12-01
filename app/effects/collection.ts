/*
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
//import { Database } from '@ngrx/db';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';

import * as collection from '../actions/collection';
import { Book } from '../models/book';


@Injectable()
export class CollectionEffects {
  constructor(private actions$: Actions,
              //private db: Database
              )
              { }


  @Effect({ dispatch: false })
  openDB$: Observable<any> = defer(() => {
    return this.db.open('books_app');
  });


  @Effect()
  loadCollection$: Observable<Action> = this.actions$
    .ofType(collection.ActionTypes.LOAD)
    .startWith(new collection.LoadAction())
    .switchMap(() =>
      this.db.query('books')
        .toArray()
        .map((books: Book[]) => new collection.LoadSuccessAction(books))
        .catch(error => of(new collection.LoadFailAction(error)))
    );

  @Effect()
  addBookToCollection$: Observable<Action> = this.actions$
    .ofType(collection.ActionTypes.ADD_BOOK)
    .map((action: collection.AddBookAction) => action.payload)
    .mergeMap(book =>
      this.db.insert('books', [ book ])
        .map(() => new collection.AddBookSuccessAction(book))
        .catch(() => of(new collection.AddBookFailAction(book)))
    );


  @Effect()
  removeBookFromCollection$: Observable<Action> = this.actions$
    .ofType(collection.ActionTypes.REMOVE_BOOK)
    .map((action: collection.RemoveBookAction) => action.payload)
    .mergeMap(book =>
      this.db.executeWrite('books', 'delete', [ book.id ])
        .map(() => new collection.RemoveBookSuccessAction(book))
        .catch(() => of(new collection.RemoveBookFailAction(book)))
    );
}
*/
