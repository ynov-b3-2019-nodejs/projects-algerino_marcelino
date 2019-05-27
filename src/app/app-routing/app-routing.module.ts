import { ProjetDetailComponent } from './../pages/projet/projet-detail/projet-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { HomeComponent } from '../home/home.component';
import { ProjetTableListComponent } from '../pages/projet/projet-table-list/projet-table-list.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
}, {
  path: 'projets',
  component: ProjetTableListComponent,
    children: [{
      path: ':id',
      component: ProjetDetailComponent
    }]
}, {
  path: 'auth',
  loadChildren: 'app/auth/auth.module#AuthModule'
}, {
  path: 'admin',
  loadChildren: 'app/admin/admin.module#AdminModule'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
  declarations: []
})

export class AppRoutingModule { }
