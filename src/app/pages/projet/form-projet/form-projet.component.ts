import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
// MODEL
import { Statut } from '../../../models/statut';
import { Projet } from '../../../models/projet';
// COMPONENT
import { ProjetTableListComponent } from './../projet-table-list/projet-table-list.component';
// SERVICES
import { StatutService } from '../../../services/statut.service';
import { ProjetService } from './../../../services/projet.service';
import {PortefeuilleService} from '../../../services/portefeuille.service';
import {Portefeuille} from '../../../models/portefeuille';



@Component({
  selector: 'app-form-projet',
  templateUrl: './form-projet.component.html',
  styleUrls: ['./form-projet.component.scss']
})

export class FormProjetComponent implements OnInit {

  projetForm: FormGroup;
  action: string;
  statuts: [Statut];
  portefeuilles: [Portefeuille];

  constructor(
    private projetService: ProjetService,
    private portefeuilleService: PortefeuilleService,
    private statutService: StatutService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProjetTableListComponent>) { }

  ngOnInit() {
    this.statutService.list().subscribe((datas: [Statut]) => {
      this.statuts = datas;
    });
    this.portefeuilleService.list(200000, 0).subscribe((datas: [Portefeuille]) => {
      this.portefeuilles = datas;
    });
  }

  onDataProjet(portefeuilleId: number, projet: Projet) {

    if (!projet) {
      this.action = 'create';

      this.projetForm = this.fb.group({
        'nom': ['', Validators.required],
        'statutId': ['', Validators.required],
        'portefeuilleId': [portefeuilleId, Validators.required]
      });
    } else {
      this.action = 'edit';

      this.projetForm = this.fb.group({
        'nom': [projet.nom, Validators.required],
        'statutId': [projet.StatutId, Validators.required],
        'portefeuilleId': [portefeuilleId, Validators.required],
        'id': [projet.id, Validators.required]
      });

    }
  }

  saveDataProjet() {

    if (this.projetForm.dirty && this.projetForm.valid) {

      if (this.action === 'create') {
        this.projetService.create(
          new Projet(
              this.projetForm.controls.nom.value,
              this.projetForm.controls.statutId.value,
              this.projetForm.controls.portefeuilleId.value)).subscribe(data => {
            this.dialogRef.close(data);
          });
      }

      if (this.action === 'edit') {
        this.projetService.edit(
          new Projet(
              this.projetForm.controls.nom.value,
              this.projetForm.controls.statutId.value,
              this.projetForm.controls.portefeuilleId.value,
              this.projetForm.controls.id.value, )).subscribe(data => {
            this.dialogRef.close(data);
          });
      }

    }
  }

}
