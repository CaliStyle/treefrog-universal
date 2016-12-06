import { GoogleBooksNode } from './google-books.node'
import { GoogleBooks, GoogleBooksEnvironment } from './google-books'

// import { provide } from '@angular/core'

export const NODE_GOOGLEBOOKS_PROVIDERS = [
  GoogleBooksNode,
  { provide: GoogleBooksEnvironment, useClass: GoogleBooksNode },
  GoogleBooks
];
