
import { LogBrowser } from './log.browser'
import { Log, LogEnviroment } from './log'

// import { provide } from '@angular/core'

export const BROWSER_LOG_PROVIDERS = [
  LogBrowser,
  { provide: LogEnviroment, useClass: LogBrowser },
  Log
];
