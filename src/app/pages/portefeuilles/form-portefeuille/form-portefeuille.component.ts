import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { TableListComponent} from '../table-list/table-list.component';
import { PortefeuilleService} from '../../../services/portefeuille.service';
import { Portefeuille} from '../../../models/portefeuille';
import { StatutService} from '../../../services/statut.service';
import { Statut} from '../../../models/statut';

@Component({
  selector: 'app-form-portefeuille',
  templateUrl: './form-portefeuille.component.html',
  styleUrls: ['./form-portefeuille.component.scss']
})
export class FormPortefeuilleComponent implements OnInit {

  userForm: FormGroup;

  statuts: [Statut];

  constructor(
    private portefeuilleService: PortefeuilleService,
    private statutService: StatutService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TableListComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.userForm = this.fb.group({
      'nom': ['', Validators.required],
      'statutId': ['', Validators.required]
    });
    this.statutService.list().subscribe((datas: [Statut]) => {
      this.statuts = datas;
    });
  }

  ngOnInit() { }

  saveUser() {
    if (this.userForm.dirty && this.userForm.valid) {
      this.portefeuilleService.create(
        new Portefeuille(this.userForm.controls.nom.value, this.userForm.controls.statutId.value)).subscribe(data => {
        this.dialogRef.close(data);
      });
    }
  }

}
