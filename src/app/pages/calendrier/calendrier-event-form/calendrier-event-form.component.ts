import { ProjetService } from './../../../services/projet.service';
import { EventService } from './../../../services/event.service';
import { Event } from './../../../models/event';
import { Projet } from './../../../models/projet';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MAT_DATE_LOCALE } from '@angular/material';
import { TableListComponent } from '../../portefeuilles/table-list/table-list.component';
import {
  addHours
} from 'date-fns';

import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-calendrier-event-form',
  templateUrl: './calendrier-event-form.component.html',
  styleUrls: ['./calendrier-event-form.component.scss'],
  providers: [
    DatePipe,
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }]
})

export class CalendrierEventFormComponent implements OnInit {

  eventForm: any;
  action: string;
  projets: [Projet];

  constructor(
    private eventService: EventService,
    private projetService: ProjetService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TableListComponent>,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) data) {

    this.projetService.list(null, null, null).subscribe((datas: [Projet]) => {
      this.projets = datas;
    });

  }

  ngOnInit() {
  }

  onDataEvent(event: Event) {

    if (!event) {
      this.action = 'create'

      this.eventForm = this.fb.group({
        'titre': ['', Validators.required],
        'datedebut': ['', Validators.required],
        'datefin': ['', Validators.required],
        'heureStart': [, Validators.required],
        'heureEnd': ['', Validators.required],
        'projetId': ['', Validators.required]
      });
    }
    else {
      this.action = 'edit'

      this.eventForm = this.fb.group({
        'id': [event.id, Validators.required],
        'titre': [event.titre, Validators.required],
        'datedebut': [event.datedebut, Validators.required],
        'datefin': [event.datefin, Validators.required],
        'heureStart': ['', Validators.required],
        'heureEnd': ['', Validators.required],
        'projetId': [event.ProjetId, Validators.required]
      });

    }
  }

  saveEvent() {
    if (this.eventForm.dirty && this.eventForm.valid) {

      const convertDateStart = addHours(this.eventForm.controls.datedebut.value, this.convertDate(this.eventForm.controls.heureStart.value));
      const convertDateEnd = addHours(this.eventForm.controls.datefin.value, this.convertDate(this.eventForm.controls.heureEnd.value));

      const dateStart = this.datePipe.transform(convertDateStart, "yyyy/MM/dd HH:mm", "fr-FR")
      const dateEnd = this.datePipe.transform(convertDateEnd, "yyyy/MM/dd HH:mm", "fr-FR")


      this.eventForm.patchValue({
        datedebut: dateStart,
        datefin: dateEnd,
      })

      if (this.action == 'create') {
        this.eventService.create(new Event(this.eventForm.controls.titre.value, this.eventForm.controls.datedebut.value, this.eventForm.controls.datefin.value, this.eventForm.controls.projetId.value)).subscribe(data => {
          this.dialogRef.close(data);
        });
      }
      if (this.action == 'edit') {
        this.eventService.update(new Event(this.eventForm.controls.titre.value, this.eventForm.controls.datedebut.value, this.eventForm.controls.datefin.value, this.eventForm.controls.projetId.value, this.eventForm.controls.projetId.id)).subscribe(data => {
          this.dialogRef.close(data);
        });
      }
    }
  }

  convertDate(dateTime: string){
    const dateSplit = dateTime.split(":");
    return Number(dateSplit[0]);
  }
}
