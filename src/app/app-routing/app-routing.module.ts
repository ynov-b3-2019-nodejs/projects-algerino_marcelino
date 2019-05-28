import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { HomeComponent } from '../home/home.component';
import { ProjetTableListComponent } from '../pages/projet/projet-table-list/projet-table-list.component';
import { ProjetDetailComponent } from '../pages/projet/projet-detail/projet-detail.component';
import { LivrableTableListComponent } from '../pages/livrable/livrable-table-list/livrable-table-list.component';
import { LivrableDetailComponent } from '../pages/livrable/livrable-detail/livrable-detail.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
}, {
  path: 'projets',
  component: ProjetTableListComponent,
}, {
  path: 'projets/:id',
  component: ProjetDetailComponent
},
{
  path: 'livrables',
  component: LivrableTableListComponent,
}, {
  path: 'livrables/:id',
  component: LivrableDetailComponent
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
