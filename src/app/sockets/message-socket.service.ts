import { Injectable } from '@angular/core';
import {SocketService} from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class MessageSocketService {

  private messageReceivedEvents = [];

  constructor(private socketService: SocketService) {
    socketService.getSocket().on('msg-received', (content) => {
      this.messageReceivedEvents.forEach((el) => {
        el(content);
      });
    });
  }

  AddMessageReceivedEvent(func) {
    this.messageReceivedEvents.push(func);
  }

  SendMessageEvent(fullname, message) {
    this.socketService.getSocket().emit('msg-send', JSON.stringify({fullname, message}));
  }
}
