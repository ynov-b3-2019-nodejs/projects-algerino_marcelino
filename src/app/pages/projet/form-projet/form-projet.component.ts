import { Portefeuille } from './../../../models/portefeuille';
import { ProjetService } from './../../../services/projet.service';
import { ProjetTableListComponent } from './../projet-table-list/projet-table-list.component';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { StatutService } from '../../../services/statut.service';
import { Statut } from '../../../models/statut';
import { Projet } from '../../../models/projet';

@Component({
  selector: 'app-form-projet',
  templateUrl: './form-projet.component.html',
  styleUrls: ['./form-projet.component.scss']
})
export class FormProjetComponent implements OnInit {

  projetForm: FormGroup;
  portefeuille: Portefeuille;
  statuts: [Statut];

  constructor(
    private projetService: ProjetService,
    private statutService: StatutService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProjetTableListComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {

    this.projetForm = this.fb.group({
      'nom': ['', Validators.required],
      'statutId': ['', Validators.required],
      'portefeuilleId': ['', Validators.required]
    });

    this.statutService.list().subscribe((datas: [Statut]) => {
      this.statuts = datas;
    });
  }

  saveProjet() {

    this.projetForm.controls.portefeuilleId.setValue(this.portefeuille.id);

    if (this.projetForm.dirty && this.projetForm.valid) {
      this.projetService.create(
        new Projet(this.projetForm.controls.nom.value, this.projetForm.controls.statutId.value, this.projetForm.controls.portefeuilleId.value)).subscribe(data => {
          this.dialogRef.close(data);
        });

    }
  }

}
