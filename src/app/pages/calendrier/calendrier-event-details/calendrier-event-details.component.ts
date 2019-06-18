import { EventService } from './../../../services/event.service';
import { Event } from './../../../models/event';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { CalendrierEventFormComponent } from '../calendrier-event-form/calendrier-event-form.component';

@Component({
  selector: 'app-calendrier-event-details',
  templateUrl: './calendrier-event-details.component.html',
  styleUrls: ['./calendrier-event-details.component.scss']
})
export class CalendrierEventDetailsComponent implements OnInit {

  isDataLoaded: boolean;
  event: Event;
  constructor(private eventService: EventService, public dialog: MatDialog, private snackBar: MatSnackBar, ) { }

  ngOnInit() {
  }

  onLoadEvent(id: number) {
    this.isDataLoaded = false;

    this.eventService.getById(id).subscribe((data: Event) => {

      this.event = data;

      this.isDataLoaded = true;

    });

  }

  openDialog(event: Event) {
    const dialogRef = this.dialog.open(CalendrierEventFormComponent);

    dialogRef.componentInstance.onDataEvent(event);

    dialogRef.afterClosed().subscribe((result: Event) => {
      if (!result) {
        return false;
      }
      this.snackBar.open('Événement modifié !', 'Ok', { duration: 5000 });
      this.dialog.closeAll();
    });
  }

  delete(id: number) {
    this.eventService.delete(id);
  }
}
