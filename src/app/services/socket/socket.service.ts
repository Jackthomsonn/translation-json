import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})

export class SocketService {
  private socket: SocketIOClient.Socket;
  private socketUri: string;

  constructor() {
    if (environment.production) {
      this.socketUri = 'https://translation-json.herokuapp.com/';
    } else {
      this.socketUri = 'http://localhost:8080';
    }
  }

  public connect = () => {
    this.socket = io(this.socketUri);
  }

  public emit = (eventName: string, data: any) => {
    this.socket.emit(eventName, data);
  }

  public on = (eventName: string, callback: Function) => {
    this.socket.on(eventName, callback);
  }

  public remove = (eventName) => {
    this.socket.removeListener(eventName);
  }
}
