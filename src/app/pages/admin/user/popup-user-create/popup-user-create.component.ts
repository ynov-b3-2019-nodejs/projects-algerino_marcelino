import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TableListPortefeuilleComponent} from '../../../portefeuilles/table-list/table-list-portefeuille.component';
import {UserService} from '../../../../services/user.service';
import {Role} from '../../../../models/role.model';
import {RoleService} from '../../../../services/role.service';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-popup-user-create',
  templateUrl: './popup-user-create.component.html',
  styleUrls: ['./popup-user-create.component.scss']
})
export class PopupUserCreateComponent implements OnInit {

  userForm: any;
  Roles: Array<Role>;
  password = '';
  isNew: Boolean = true;

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TableListPortefeuilleComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    if (data.element && data.element.id) {
      this.isNew = false;
    }
    console.log('this.isNew : ', this.isNew);
    this.userForm = this.fb.group({
      'id': [null],
      'fullname': ['', Validators.required],
      'password': (this.isNew ? ['', Validators.required] : ['']),
      'email': ['', [Validators.required, Validators.email]],
      'Roles': [[], Validators.required]
    });
    this.loadRoles();
    this.userForm.setValue({
      'id': (this.isNew ? null : data.element.id),
      'fullname': this.isNew ? '' : data.element.fullname,
      'password': '',
      'email': this.isNew ? '' : data.element.email,
      'Roles': this.isNew ? [] : data.element.Roles.map(role => role.id)
    });
  }

  loadRoles() {
    this.roleService.list().subscribe((roles: Array<Role>) => {
      this.Roles = roles;
    });
  }

  generatePassword() {
    const password = Md5.hashStr((new Date()).toISOString()) as string;
    this.password = password;
    this.userForm.controls.password.patchValue(password);
  }

  ngOnInit() {
  }

  saveUser() {
    console.log('saveUser');
    console.log(this.userForm.dirty);
    console.log(this.userForm.valid);
    if (this.userForm.dirty && this.userForm.valid) {
      if (this.isNew) {
        console.log('create');
        this.userService.create({
          id: null,
          fullname: this.userForm.controls.fullname.value,
          email: this.userForm.controls.email.value,
          password: this.userForm.controls.password.value,
          roles: this.userForm.controls.Roles.value
        }).subscribe(data => {
          this.dialogRef.close(data);
        });
      } else {
        console.log('update');
        this.userService.update({
          id: this.userForm.controls.id.value,
          fullname: this.userForm.controls.fullname.value,
          email: this.userForm.controls.email.value,
          password: this.password === '' ? null : this.userForm.controls.password.value,
          roles: this.userForm.controls.Roles.value
        }).subscribe(data => {
          console.log('update data : ', data);
          this.dialogRef.close(data);
        });
      }
    }
  }
}
