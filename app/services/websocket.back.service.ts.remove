import { Injectable }    from '@angular/core';
import {WebsocketService} from "../interfaces/websocket.service";
@Injectable()
export class WebsocketServiceBack {
  init() {}
}

export const NODE_WEBSOCKET_PROVIDERS = [
  WebsocketServiceBack,
  WebsocketService,
  { provide: WebsocketService, useClass: WebsocketServiceBack }
];
