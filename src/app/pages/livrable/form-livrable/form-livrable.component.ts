import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
// MODEL
import { Statut } from '../../../models/statut';
// COMPONENT
import { LivrableTableListComponent } from './../livrable-table-list/livrable-table-list.component';
// SERVICES
import { StatutService } from '../../../services/statut.service';
import { LivrableService } from './../../../services/livrable.service';
import { Livrable } from '../../../models/livrable';

@Component({
  selector: 'app-form-livrable',
  templateUrl: './form-livrable.component.html',
  styleUrls: ['./form-livrable.component.scss']
})
export class FormLivrableComponent implements OnInit {

  livrableForm: FormGroup;
  action: string;
  statuts: [Statut];

  constructor(
    private livrableService: LivrableService,
    private statutService: StatutService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LivrableTableListComponent>) { }

  ngOnInit() {
    this.statutService.list().subscribe((datas: [Statut]) => {
      this.statuts = datas;
    });
  }

  onDataLivrable(projetId: number, livrable: Livrable) {

    if (!livrable) {
      this.action = 'create'

      this.livrableForm = this.fb.group({
        'nom': ['', Validators.required],
        'dateprevu': ['', Validators.required],
        'datefin': ['', Validators.required],
        'projetId': [projetId, Validators.required],
        'statutId': ['', Validators.required]
      });
    }
    else {
      this.action = 'edit'

      this.livrableForm = this.fb.group({
        'id': [livrable.id, Validators.required],
        'nom': [livrable.nom, Validators.required],
        'dateprevu': [livrable.dateprevu, Validators.required],
        'datefin': [livrable.datefin, Validators.required],
        'projetId': [projetId, Validators.required],
        'statutId': [livrable.StatutId, Validators.required]
      });

    }
  }

  saveDataLivrable() {

    if (this.livrableForm.dirty && this.livrableForm.valid) {

      if (this.action == 'create') {
        this.livrableService.create(
          new Livrable(
            this.livrableForm.controls.nom.value,
            this.livrableForm.controls.dateprevu.value,
            this.livrableForm.controls.datefin.value,
            this.livrableForm.controls.projetId.value,
            this.livrableForm.controls.statutId.value))
            .subscribe(data => {
            this.dialogRef.close(data);
          });
      }

      if (this.action == 'edit') {

        this.livrableService.edit(
          new Livrable(
            this.livrableForm.controls.nom.value,
            this.livrableForm.controls.dateprevu.value,
            this.livrableForm.controls.datefin.value,
            this.livrableForm.controls.projetId.value,
            this.livrableForm.controls.statutId.value,
            this.livrableForm.controls.id.value))
          .subscribe(data => {
            this.dialogRef.close(data);
          });
      }

    }
  }
}