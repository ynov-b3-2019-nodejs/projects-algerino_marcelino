import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { HomeComponent } from '../home/home.component';
import { TableListPortefeuilleComponent } from '../pages/portefeuilles/table-list/table-list-portefeuille.component';
import { DetailPortefeuilleComponent } from '../pages/portefeuilles/detail-portefeuille/detail-portefeuille.component';

const routes: Routes = [{
  path: '/',
  component: HomeComponent
}, {
  path: 'auth',
  loadChildren: 'app/auth/auth.module#AuthModule'
}, {
  path: 'admin',
  loadChildren: 'app/admin/admin.module#AdminModule'
}, {
  component: TableListPortefeuilleComponent,
  path: '/portefeuille'
}, {
  path: '/portefeuille/:id',
  component: DetailPortefeuilleComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
  declarations: []
})

export class AppRoutingModule {}
