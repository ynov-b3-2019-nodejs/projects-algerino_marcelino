import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import {
  CalendarDateFormatter,
  CalendarEvent,
  CalendarView,
  DAYS_OF_WEEK,
  CalendarMonthViewDay
} from 'angular-calendar';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { DOCUMENT } from '@angular/common';
import { CustomDateFormatter } from '../providers/custom-date-formatter.provider';

@Component({
  selector: 'app-calendrier-event-list',
  templateUrl: './calendrier-event-list.component.html',
  styleUrls: ['./calendrier-event-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})

export class CalendrierEventListComponent implements OnInit {

  private readonly darkThemeClass = 'custom-theme';

  view: CalendarView = CalendarView.Week;

  viewDate = new Date();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',

      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',

    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      allDay: true
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'A draggable and resizable event',

      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }, {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'A draggable and resizable event',

      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }, {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'A draggable and resizable event',

      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];

  locale: string = 'fr';

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];

  CalendarView = CalendarView;

  setView(view: CalendarView) {
    this.view = view;
  }

  constructor(@Inject(DOCUMENT) private document) { }

  ngOnInit(): void {
    this.document.body.classList.add(this.darkThemeClass);
  }

  ngOnDestroy(): void {
    this.document.body.classList.remove(this.darkThemeClass);
  }

}
