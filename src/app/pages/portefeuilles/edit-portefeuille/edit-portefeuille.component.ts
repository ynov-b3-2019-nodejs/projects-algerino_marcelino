import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import { TableListPortefeuilleComponent } from '../table-list/table-list-portefeuille.component';
import { MatDialogRef } from '@angular/material/dialog';
import { Portefeuille } from '../../../models/portefeuille';
import { PortefeuilleService } from '../../../services/portefeuille.service';
import { StatutService } from '../../../services/statut.service';
import { Statut } from '../../../models/statut';

@Component({
  selector: 'app-edit-portefeuille',
  templateUrl: './edit-portefeuille.component.html',
  styleUrls: ['./edit-portefeuille.component.scss']
})
export class EditPortefeuilleComponent implements OnInit {

  statuts: [Statut];
  portefeuilleForm: FormGroup;
  currentPortefeuille: Portefeuille;

  constructor(
    private portefeuilleService: PortefeuilleService,
    private statutService: StatutService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TableListPortefeuilleComponent>) {
      this.statutService.list().subscribe((datas: [Statut]) => {
        this.statuts = datas;
      });
    }

  ngOnInit() {
  }

  getCurrentPortefeuille(currentPortefeuille: Portefeuille) {
    this.currentPortefeuille = currentPortefeuille;
    this.portefeuilleForm = this.fb.group({
      'nom': [currentPortefeuille.nom, Validators.required],
      'statutId': [currentPortefeuille.StatutId, Validators.required]
    });
  }

  handleEdit() {
    if (this.portefeuilleForm.dirty && this.portefeuilleForm.valid) {

      this.portefeuilleService
        .update(
        new Portefeuille(
          this.portefeuilleForm.controls.nom.value,
          this.portefeuilleForm.controls.statutId.value,
          this.currentPortefeuille.id))
        .subscribe((data) => {
        this.dialogRef.close(data);
      });
    }
  }

}
