import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket;

  constructor() {
    this.socket = io(environment.socketUrl);
    this.socket.on('error', function (err) {
      console.error(err);
    });
    this.socket.on('connect_error', function (err) {
      console.error('connect error', err);
    });
  }

  getSocket() {
    return this.socket;
  }
}
