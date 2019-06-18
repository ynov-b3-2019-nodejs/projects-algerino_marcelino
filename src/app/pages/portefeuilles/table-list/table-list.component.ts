import {Component, OnInit, ViewChild} from '@angular/core';
import {PortefeuilleService} from '../../../services/portefeuille.service';
import {Portefeuille} from '../../../models/portefeuille';
import {MatDialog, MatPaginatorIntl, MatSnackBar, MatTableDataSource} from '@angular/material';
import {FormPortefeuilleComponent} from '../form-portefeuille/form-portefeuille.component';
import {AuthService} from '../../../services/auth.service';
import {User} from '../../../models/user.model';

@Component({
  selector: 'app-portefeuille-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss'],
})
export class TableListComponent implements OnInit {
  displayedColumns: string[] = ['nom', 'createdAt', 'updatedAt', 'statut'];
  portefeuille: MatTableDataSource<Portefeuille>;
  user: User;

  isDataLoaded = false;

  @ViewChild(MatPaginatorIntl) paginator: MatPaginatorIntl;

  constructor(
    private snackBar: MatSnackBar,
    private portefeuilleService: PortefeuilleService,
    private authService: AuthService,
    public dialog: MatDialog) {
    authService.getUser().subscribe((currentUser: User) => {
      this.user = currentUser;
    });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isDataLoaded = false;
    this.portefeuilleService.list().subscribe((datas: Array<Portefeuille>) => {
      for (const data of datas) {
        data.createdAt = new Date(Date.parse(Date()));
        data.updatedAt = new Date(Date.parse(Date()));
      }
      this.portefeuille = new MatTableDataSource<Portefeuille>(datas);
      // this.portefeuille.paginator = this.paginator;
      this.isDataLoaded = true;
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(FormPortefeuilleComponent);

    dialogRef.afterClosed().subscribe((result: Portefeuille) => {
      this.snackBar.open('Portefeuille ' + result.nom + ' créé !', 'Effacer', {duration: 5000});
      this.loadData();
    });
  }

}
