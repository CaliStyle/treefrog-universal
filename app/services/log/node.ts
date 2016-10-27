import { LogNode } from './log.node'
import { Log, LogEnviroment} from './log'

// import { provide } from '@angular/core'

export const NODE_LOG_PROVIDERS = [
  LogNode,
  { provide: LogEnviroment, useClass: LogNode },
  Log
];
