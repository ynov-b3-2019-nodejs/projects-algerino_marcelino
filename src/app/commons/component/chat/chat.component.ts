import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Message} from '../../../models/message';
import {MessageSocketService} from '../../../sockets/message-socket.service';
import {User} from '../../../models/user.model';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  messages: Array<Message> = [];
  message = '';
  public user: User;
  @ViewChild('ChatMessage') chatMessageContainer: ElementRef;
  @Input() isOpen: boolean;

  constructor(
    private authService: AuthService,
    private messageSocketService: MessageSocketService) {
    messageSocketService.AddMessageReceivedEvent((messageJSON) => {
      const el = this.chatMessageContainer.nativeElement;
      const isScrolledToBottom = el.scrollHeight - el.clientHeight === el.scrollTop;
      this.messages.push(JSON.parse(messageJSON));

      setTimeout(() => {
        el.scrollTop = el.scrollHeight - el.clientHeight;
      });
    });

    this.authService.getUser().subscribe((user: User) => {
      this.user = user;
    });
  }

  sendMsg() {
    this.messageSocketService.SendMessageEvent(this.user.fullname, this.message);
    this.message = '';
  }

  ngOnInit() {
  }

}
