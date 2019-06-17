import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

// or with import syntax
// import io from 'socket.io-client';


import {AuthService} from './services/auth.service';
import * as schema from './schema/equipment.json';
import {User, isAdmin} from './models/user.model';
import {Role} from './models/role.model';
import {environment} from '../environments/environment';
import {CalendarSocketService} from './sockets/calendar-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private userSubscription: Subscription;
  public user: User;

  constructor(
    private authService: AuthService,
    private calendarSocketService: CalendarSocketService,
    private router: Router,
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry
  ) {
    this.registerSvgIcons();
  }

  public ngOnInit() {

    // init this.user on startup
    this.authService.me().subscribe((data: any) => {
      // none
    });

    // update this.user after login/register/logout
    this.userSubscription = this.authService.getUser().subscribe((user: User) => {
      this.user = user;
    });

    this.calendarSocketService.AddCalendarChangeEvent(() => {
      console.log('reload');
      console.warn(this.user.fullname);
    });
    setInterval(() => {
      console.log('Hello World !');
      this.calendarSocketService.SendCalendarChangeEvent();
    }, 5000);
  }

  logout(): void {
    this.authService.signOut();
    this.navigate('');
  }

  navigate(link): void {
    this.router.navigate([link]);
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  registerSvgIcons() {
    [
      'close',
      'add',
      'add-blue',
      'airplane-front-view',
      'air-station',
      'balloon',
      'boat',
      'cargo-ship',
      'car',
      'catamaran',
      'clone',
      'convertible',
      'delete',
      'drone',
      'fighter-plane',
      'fire-truck',
      'horseback-riding',
      'motorcycle',
      'railcar',
      'railroad-train',
      'rocket-boot',
      'sailing-boat',
      'segway',
      'shuttle',
      'space-shuttle',
      'steam-engine',
      'suv',
      'tour-bus',
      'tow-truck',
      'transportation',
      'trolleybus',
      'water-transportation',
    ].forEach((icon) => {
      this.matIconRegistry.addSvgIcon(icon, this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/${icon}.svg`));
    });
  }

}
