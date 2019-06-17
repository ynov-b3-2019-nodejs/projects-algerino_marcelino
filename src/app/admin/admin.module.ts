import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {OnlyAdminUsersGuard} from './admin-user-guard';
import { PopupUserCreateComponent } from '../pages/admin/user/popup-user-create/popup-user-create.component';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AdminComponent,
    PopupUserCreateComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [
    OnlyAdminUsersGuard
  ]})
export class AdminModule {}
