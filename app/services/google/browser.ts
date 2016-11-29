import { GoogleBooksBrowser } from './google-books.browser'
import { GoogleBooks, GoogleBooksEnviroment } from './google-books'

// import { provide } from '@angular/core'

export const BROWSER_GOOGLEBOOKS_PROVIDERS = [
  GoogleBooksBrowser,
  { provide: GoogleBooksEnviroment, useClass: GoogleBooksBrowser },
  GoogleBooks
];
