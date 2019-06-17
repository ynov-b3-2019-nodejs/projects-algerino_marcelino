import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../services/user.service';
import {User} from '../../../../models/user.model';
import {FormPortefeuilleComponent} from '../../../portefeuilles/form-portefeuille/form-portefeuille.component';
import {Portefeuille} from '../../../../models/portefeuille';
import {MatDialog, MatSnackBar} from '@angular/material';
import {PortefeuilleService} from '../../../../services/portefeuille.service';
import {AuthService} from '../../../../services/auth.service';
import {PopupUserCreateComponent} from '../popup-user-create/popup-user-create.component';
import {YesNoPopupComponent} from '../../../../commons/component/yes-no-popup/yes-no-popup.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  displayedColumns: string[] = ['fullname', 'email', 'action'];
  users: Array<User>;
  isDataLoaded = false;

  constructor(private userService: UserService,
              private snackBar: MatSnackBar,
              private authService: AuthService,
              public dialog: MatDialog) {
    this.loadData();
  }

  loadData() {
    this.userService.list().subscribe((users: Array<User>) => {
      this.users = users;
      this.isDataLoaded = true;
    });
  }

  ngOnInit() {
  }

  delete(element) {
    const dialogRef = this.dialog.open(YesNoPopupComponent, {
      data: {title: 'Voulez-vous supprimer ' + element.fullname + ' ?'}
    });
    dialogRef.afterClosed().subscribe((result: Boolean) => {
      if (result) {
        this.userService.delete(element.id).subscribe(data => {
          this.snackBar.open('Utilisateur ' + element.fullname + ' supprimé !', 'Effacer', {duration: 5000});
          this.loadData();
        });
      }
    });
  }

  openDialog(element) {
    const dialogRef = this.dialog.open(PopupUserCreateComponent, {
      height: '400px',
      width: '600px',
      data: {element}
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('result : ', result);
      this.snackBar.open('Utilisateur ' + result.fullname + ' ' + (element ? 'modifié' : 'créé') + ' !', 'Effacer', {duration: 5000});
      this.loadData();
    });
  }
}
