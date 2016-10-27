import * as Primus from 'primus';
import { Injectable }    from '@angular/core';
import {WebsocketService} from "../interfaces/websocket.service";
import {NotificationService} from "./notification.service";

@Injectable()
export class WebsocketServiceFront {
  constructor(private notificationService: NotificationService) {}

  init() {
    //
    // Tell primus to create a new connect to the current domain/port/protocol
    //
    const primus = Primus.connect('ws://localhost:3000?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOm51bGwsImxhc3ROYW1lIjpudWxsLCJtaWRkbGVOYW1lIjpudWxsLCJwaG9uZSI6bnVsbCwibW9iaWxlIjpudWxsLCJhZGRyZXNzT25lIjpudWxsLCJhZGRyZXNzVHdvIjpudWxsLCJhZGRyZXNzVGhyZWUiOm51bGwsImNpdHkiOm51bGwsInN0YXRlIjpudWxsLCJwb3N0YWwiOm51bGwsImNvdW50cnkiOm51bGwsImNyZWF0ZWRBdCI6IjIwMTYtMDctMjNUMTE6MjU6MjQuNTI0WiIsInVwZGF0ZWRBdCI6IjIwMTYtMDctMjNUMTE6MjU6MjQuNTI0WiIsInBhc3Nwb3J0cyI6W3siaWQiOjEsInByb3RvY29sIjoibG9jYWwiLCJwYXNzd29yZCI6IiQyYSQxMCQ3aDhOV3pTYUw1UE1iUGVYRGd3UGRPZldGbW01TnJ1dTBvMmx6WmdYaEJRUi5kRzJiaDc2LiIsInByb3ZpZGVyIjpudWxsLCJpZGVudGlmaWVyIjpudWxsLCJ0b2tlbnMiOm51bGwsImNyZWF0ZWRBdCI6IjIwMTYtMDctMjNUMTE6MjU6MjQuNTQ5WiIsInVwZGF0ZWRBdCI6IjIwMTYtMDctMjNUMTE6MjU6MjQuNTQ5WiIsIlVzZXJJZCI6MX1dfSwiaWF0IjoxNDY5MjczMzE5LCJleHAiOjE0NjkzNTk3MTksImF1ZCI6ImxvY2FsaG9zdCIsImlzcyI6ImxvY2FsaG9zdCJ9.9PRdh-7TURLEqDRxe1_fvRVA1xe72c-mJIbMce_-8uE');

    (<any> primus).join = function (room, fn) {
      (<any> primus).send('join', room, fn)
    };

    (<any> primus).leave = function (room, fn) {
      (<any> primus).send('leave', room, fn)
    };

    primus.on('create', data => {
      console.log('create', data)
    });
    primus.on('update', data => {
      console.log('update', data)
    });
    primus.on('destroy', data => {
      console.log('destroy', data)
    });
    primus.on('notification', data => {
      this.notificationService.manageNotification(data)
      console.log('notification', data)
    });

    (<any> primus).join('notification');
  }

}

export const BROWSER_WEBSOCKET_PROVIDERS = [
  WebsocketServiceFront,
  WebsocketService,
  { provide: WebsocketService, useClass: WebsocketServiceFront }
];
