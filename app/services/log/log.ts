import { Injectable } from '@angular/core';

// Abstract Class to Catch implementations
export class LogEnviroment {
  log(msg: String): any {
    throw new Error('Error init LogEnviroment')
  }
  error(msg: String): any {
    throw new Error('Error boot LogEnviroment')
  }
  debug(msg: String): any {
    throw new Error('Error update LogEnviroment')
  }
}
// Log -> LogEnviroment
@Injectable()
export class Log {
  constructor(public logger: LogEnviroment){}

  log(msg){
    return this.logger.log(msg);
  }
  error(msg){
    return this.logger.error(msg);
  }
  debug(msg){
    return this.logger.debug(msg);
  }
}