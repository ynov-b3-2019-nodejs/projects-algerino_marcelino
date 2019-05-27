import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Input() user: any = {};
  constructor(
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.authService.$userSource.subscribe((user) => {
      this.user = user;
    });
  }

}
