import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {SocketService} from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarSocketService {

  private calendarChangeEvents = [];

  constructor(private socketService: SocketService) {
    socketService.getSocket().on('calendar-changed', () => {
      this.calendarChangeEvents.forEach((el) => {
        el();
      });
    });
  }

  AddCalendarChangeEvent(func) {
    this.calendarChangeEvents.push(func);
  }

  SendCalendarChangeEvent() {
    this.socketService.getSocket().emit('calendar-update');
  }
}
