import 'rxjs/add/operator/map';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Book } from '../../models/book';

// Abstract Class to Catch implementations
export class GoogleBooksEnvironment {
  searchBooks(queryTitle: string): Observable<Book[]> {
    throw new Error('Error searchBooks GoogleBooksEnvironment')
  }
  retrieveBook(volumeId: string): Observable<Book> {
    throw new Error('Error retrieveBook GoogleBooksEnvironment')
  }
}
// Emailer -> EmailerEnviroment
@Injectable()
export class GoogleBooks {

  constructor(public googleBooks: GoogleBooksEnvironment) {}

  searchBooks(queryTitle) {
    return this.googleBooks.searchBooks(queryTitle);
  }

  retrieveBook(volumeId) {
    return this.googleBooks.retrieveBook(volumeId);
  }
}
