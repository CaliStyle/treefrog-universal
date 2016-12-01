import { GoogleBooksBrowser } from './google-books.browser'
import { GoogleBooks, GoogleBooksEnvironment } from './google-books'

// import { provide } from '@angular/core'

export const BROWSER_GOOGLEBOOKS_PROVIDERS = [
  GoogleBooksBrowser,
  { provide: GoogleBooksEnvironment, useClass: GoogleBooksBrowser },
  GoogleBooks
];
