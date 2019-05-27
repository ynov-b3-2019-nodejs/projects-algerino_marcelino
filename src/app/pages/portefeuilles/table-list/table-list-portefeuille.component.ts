import {Component, OnInit, ViewChild} from '@angular/core';
import {PortefeuilleService} from '../../../services/portefeuille.service';
import {Portefeuille} from '../../../models/portefeuille';
import {MatDialog, MatPaginatorIntl, MatSnackBar, MatTableDataSource, MatPaginator} from '@angular/material';
import {FormPortefeuilleComponent} from '../form-portefeuille/form-portefeuille.component';
import { EditPortefeuilleComponent } from '../edit-portefeuille/edit-portefeuille.component';
import {PageEvent} from '@angular/material/typings/paginator';
import {Router} from '@angular/router';

@Component({
  selector: 'app-portefeuille-table-list',
  templateUrl: './table-list-portefeuille.component.html',
  styleUrls: ['./table-list-portefeuille.component.scss'],
})
export class TableListPortefeuilleComponent implements OnInit {
  displayedColumns: string[] = ['nom', 'createdAt', 'updatedAt', 'statut', 'action'];
  portefeuille: MatTableDataSource<Portefeuille>;
  limit = 5;
  page = 0;
  numberOfElements: number;

  isDataLoaded = false;

  @ViewChild(MatPaginatorIntl) paginator: MatPaginator;

  constructor(
    private snackBar: MatSnackBar,
    private portefeuilleService: PortefeuilleService,
    public dialog: MatDialog,
    private router: Router) {
  }

  ngOnInit() {
    this.portefeuilleService.count().subscribe(
      (occurrences) => this.numberOfElements = occurrences
    );
    this.loadData();
  }

  loadData() {
    this.isDataLoaded = false;
    this.portefeuilleService.list(this.limit, this.page).subscribe((datas: Array<Portefeuille>) => {
      for (const data of datas) {
        data.createdAt = new Date(Date.parse(Date()));
        data.updatedAt = new Date(Date.parse(Date()));
      }
      this.portefeuille = new MatTableDataSource<Portefeuille>(datas);
      this.portefeuille.paginator = this.paginator;
      this.isDataLoaded = true;
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(FormPortefeuilleComponent);

    dialogRef.afterClosed().subscribe((result: Portefeuille) => {
      if (result) {
        this.snackBar.open(`Le portefeuille ${result.nom} a été créer avec succès !`, 'Ok', {duration: 3000});
      }
    });
  }

  editDialog(targetPortefeuille: Portefeuille) {
    const dialogRef = this.dialog.open(EditPortefeuilleComponent);

    dialogRef.componentInstance.getCurrentPortefeuille(targetPortefeuille);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadData();
        this.snackBar.open(`Portefeuille modifié avec succès !`, 'Ok', {duration: 3000});
      }
    });
  }

  deleteLine(portefeuilleId: number) {
    this.portefeuilleService.delete(portefeuilleId).subscribe(
      () => { this.loadData(); }
    );
  }

  pageEvent(event: PageEvent) {
    this.limit = event.pageSize;
    this.page = event.pageIndex;
    this.loadData();
  }

  goToDetail(portefeuilleId: number) {
    this.router.navigate([`/portefeuille/${portefeuilleId}`]);
  }

}
