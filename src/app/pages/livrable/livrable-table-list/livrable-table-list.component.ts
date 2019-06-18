import { Livrable } from "./../../../models/livrable";
import { LivrableService } from './../../../services/livrable.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatDialog, MatSnackBar, MatTableDataSource, MatPaginatorIntl, PageEvent } from '@angular/material';
import { FormLivrableComponent } from './../form-livrable/form-livrable.component';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector   : 'app-livrable-table-list',
  templateUrl: './livrable-table-list.component.html',
  styleUrls  : ['./livrable-table-list.component.scss']
})

export class LivrableTableListComponent implements OnInit {

  displayedColumns: string[] = ['nom', 'dateprevu', 'datefin', 'statut', 'action'];
  livrable: MatTableDataSource<Livrable>;
  limit = 5;
  page = 0;
  numberOfElements: number;

  @Input() projetId: number;

  isDataLoaded = false;

  @ViewChild(MatPaginatorIntl) paginator: MatPaginatorIntl;

  constructor(private snackBar: MatSnackBar, private livrableService: LivrableService, public dialog: MatDialog) { }

  ngOnInit() { this.loadData(); }

  loadData() {
    this.isDataLoaded = false;

    this.livrableService.count(this.projetId).subscribe(
      (occurrences) => this.numberOfElements = occurrences
    );

    this.livrableService.list(this.projetId, this.page, this.limit).subscribe((datas: Array<Livrable>) => {
      this.livrable     = new MatTableDataSource<Livrable>(datas);
      this.isDataLoaded = true;
    });
  }

  openDialog(livrable: Livrable) {
    const dialogRef = this.dialog.open(FormLivrableComponent);

    dialogRef.componentInstance.onDataLivrable(this.projetId, livrable);


    dialogRef.afterClosed().subscribe((result: Livrable) => {
      if (result) {
        this.snackBar.open('Le livrable ' + result.nom + ' à bien été créé !', 'OK', { duration: 5000 });
        this.loadData();
      }
    });
  }

  deleteProjet(livrableId: number) {
    this.livrableService.delete(livrableId).subscribe((data) => { this.loadData(); });
  }


  pageEvent(event: PageEvent) {
    this.limit = event.pageSize;
    this.page = event.pageIndex;
    this.loadData();
  }

}

