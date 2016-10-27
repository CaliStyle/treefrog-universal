import { EmailerNode } from './emailer.node'
import { Emailer, EmailerEnviroment} from './emailer'

// import { provide } from '@angular/core'

export const NODE_EMAILER_PROVIDERS = [
  EmailerNode,
  { provide: EmailerEnviroment, useClass: EmailerNode },
  Emailer
];
