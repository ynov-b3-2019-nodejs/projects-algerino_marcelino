import { Livrable } from "./../../../models/livrable";
import { LivrableService } from './../../../services/livrable.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar, MatTableDataSource, MatPaginatorIntl } from '@angular/material';
import { FormLivrableComponent } from './../form-livrable/form-livrable.component';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-livrable-table-list',
  templateUrl: './livrable-table-list.component.html',
  styleUrls: ['./livrable-table-list.component.scss']
})

export class LivrableTableListComponent implements OnInit {

  displayedColumns: string[] = ['nom', 'dateprevu', 'datefin', 'createdAt', 'updatedAt', 'statut', 'projet', 'action'];
  livrable: MatTableDataSource<Livrable>;

  isDataLoaded = false;

  @ViewChild(MatPaginatorIntl) paginator: MatPaginatorIntl;

  constructor(private activeRoute: ActivatedRoute ,private snackBar: MatSnackBar, private livrableService: LivrableService, public dialog: MatDialog) { }

  ngOnInit() { this.loadData() }

  loadData() {
    this.isDataLoaded = false;
    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        this.livrableService.list(params['id']).subscribe((datas: Array<Livrable>) => {

          for (const data of datas) {
            data.dateprevu = new Date(Date.parse(Date()));
            data.datefin = new Date(Date.parse(Date()));
            data.createdAt = new Date(Date.parse(Date()));
            data.updatedAt = new Date(Date.parse(Date()));
          }

          this.livrable = new MatTableDataSource<Livrable>(datas);
          this.isDataLoaded = true;
        });
      }
    })
  }

  openDialog(livrable: Livrable) {
    const dialogRef = this.dialog.open(FormLivrableComponent);

    dialogRef.componentInstance.onDataLivrable(livrable.ProjetId, livrable)


    dialogRef.afterClosed().subscribe((result: Livrable) => {
      if (result) {
        this.snackBar.open('Le projet ' + result.nom + ' à bien étais créé !', 'Effacer', { duration: 5000 });
        this.loadData();
      }
    });
  }

  deleteProjet(livrableId: number) {
    this.livrableService.delete(livrableId).subscribe((data) => { this.loadData(); })
  }

}

