import { EmailerBrowser } from './emailer.browser'
import { Emailer, EmailerEnviroment } from './emailer'

// import { provide } from '@angular/core'

export const BROWSER_EMAILER_PROVIDERS = [
  EmailerBrowser,
  { provide: EmailerEnviroment, useClass: EmailerBrowser },
  Emailer
];
