import { CalendarSocketService } from './../../../sockets/calendar-socket.service';
import { CalendrierEventDetailsComponent } from './../calendrier-event-details/calendrier-event-details.component';
import { Event } from './../../../models/event';
import { EventService } from './../../../services/event.service';
import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { CalendarDateFormatter, CalendarEvent, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import { DOCUMENT } from '@angular/common';
import { CustomDateFormatter } from '../providers/custom-date-formatter.provider';
import { MatDialog, MatSnackBar } from '@angular/material';
import { CalendrierEventFormComponent } from '../calendrier-event-form/calendrier-event-form.component';

import {
  addHours
} from 'date-fns';


import { Subject } from 'rxjs';

import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-calendrier-event-list',
  templateUrl: './calendrier-event-list.component.html',
  styleUrls: ['./calendrier-event-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    DatePipe,
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    }

  ]
})

export class CalendrierEventListComponent implements OnInit {

  private readonly darkThemeClass = 'custom-theme';

  view: CalendarView = CalendarView.Week;

  viewDate = new Date();

  events: CalendarEvent[] = [];

  locale = 'fr';

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];

  CalendarView = CalendarView;

  isDataLoaded: boolean;
  refresh: Subject<any> = new Subject();

  constructor(private snackBar: MatSnackBar, @Inject(DOCUMENT) private document, private eventService: EventService, public dialog: MatDialog, private socketCalendar: CalendarSocketService) { }

  ngOnInit(): void {
    this.socketCalendar.AddCalendarChangeEvent((messageJSON) => { this.loadData() });
    this.loadData();
    this.document.body.classList.add(this.darkThemeClass);

  }

  ngOnDestroy(): void {
    this.document.body.classList.remove(this.darkThemeClass);
  }

  loadData() {
    this.events = [];
    this.isDataLoaded = false;

    this.eventService.list().subscribe((datas: Array<Event>) => {
      datas.forEach(event => {
        this.events.push({
          id: event.id,
          title: event.titre,
          start: addHours(new Date(event.datedebut), 0),
          end: addHours(new Date(event.datefin), 0),
          meta: {
            projet: event.Projet
          }
        });
      });
      this.isDataLoaded = true;
    });
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  openDialog(event: Event) {
    const dialogRef = this.dialog.open(CalendrierEventFormComponent);

    dialogRef.componentInstance.onDataEvent(event);

    dialogRef.afterClosed().subscribe((result: Event) => {
      if (!result) {
        return false;
      }
      this.snackBar.open('Évenement ' + result.titre + ' créé !', 'Ok', { duration: 5000 });
      this.loadData();
    });
  }

  eventClicked({ event }: { event: CalendarEvent }): void {
    const dialogRef = this.dialog.open(CalendrierEventDetailsComponent);

    dialogRef.componentInstance.onLoadEvent(Number(event.id));
  }

}
