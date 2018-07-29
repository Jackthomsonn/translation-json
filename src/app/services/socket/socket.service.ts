import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})

export class SocketService {
  private socket: SocketIOClient.Socket;

  constructor() { }

  public connect = () => {
    this.socket = io('http://localhost:8080');
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
