import { Projet } from './../../../models/projet';
import { ProjetService } from './../../../services/projet.service';
import { FormProjetComponent } from './../form-projet/form-projet.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar, MatTableDataSource, MatPaginatorIntl, PageEvent } from '@angular/material';


@Component({
  selector: 'app-projet-table-list',
  templateUrl: './projet-table-list.component.html',
  styleUrls: ['./projet-table-list.component.scss']
})

export class ProjetTableListComponent implements OnInit {

  displayedColumns: string[] = ['nom', 'statut', 'portefeuille', 'action'];
  projet: MatTableDataSource<Projet>;

  portefeuilleId = -1;
  limit = 5;
  page = 0;
  numberOfElements: number;

  isDataLoaded = false;

  @ViewChild(MatPaginatorIntl) paginator: MatPaginatorIntl;

  constructor(private snackBar: MatSnackBar, private projetService: ProjetService, public dialog: MatDialog) { }

  ngOnInit() { this.loadData();  }

  loadData() {
    this.isDataLoaded = false;

    this.projetService.count(this.portefeuilleId).subscribe(
      (occurrences) => this.numberOfElements = occurrences
    );

    this.projetService.list(this.portefeuilleId, this.page, this.limit).subscribe((datas: Array<Projet>) => {
      this.projet = new MatTableDataSource<Projet>(datas);
      this.isDataLoaded = true;
    });
  }

  openDialog(projet: Projet) {
    const dialogRef = this.dialog.open(FormProjetComponent);

    dialogRef.componentInstance.onDataProjet(this.portefeuilleId, projet);


    dialogRef.afterClosed().subscribe((result: Projet) => {
      if (result) {
        this.snackBar.open('Le projet ' + result.nom + ' à bien été créé !', 'Ok', { duration: 5000 });
        this.loadData();
      }
    });
  }

  pageEvent(event: PageEvent) {
    this.limit = event.pageSize;
    this.page = event.pageIndex;
    this.loadData();
  }

  deleteProjet(projetId: number) {
    this.projetService.delete(projetId).subscribe(() => { this.loadData(); });
  }

}
