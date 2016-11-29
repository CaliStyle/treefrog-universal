import { GoogleBooksNode } from './google-books.node'
import { GoogleBooks, GoogleBooksEnviroment } from './google-books'

// import { provide } from '@angular/core'

export const NODE_GOOGLEBOOKS_PROVIDERS = [
  GoogleBooksNode,
  { provide: GoogleBooksEnviroment, useClass: GoogleBooksNode },
  GoogleBooks
];
