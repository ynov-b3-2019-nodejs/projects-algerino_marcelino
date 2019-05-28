import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LOCALE_ID, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HttpClientModule, HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';

import {SharedModule} from './shared/shared.module';
import {AuthModule} from './auth/auth.module';

import {AppComponent} from './app.component';
import {AdminModule} from './admin/admin.module';
import {AuthHeaderInterceptor} from './interceptors/header.interceptor';
import {CatchErrorInterceptor} from './interceptors/http-error.interceptor';

import {AppRoutingModule} from './app-routing/app-routing.module';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {TableListPortefeuilleComponent} from './pages/portefeuilles/table-list/table-list-portefeuille.component';
import {
  MatDialogModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatTooltipModule,
  MatPaginatorIntl
} from '@angular/material';
import {TableListComponent} from './pages/portefeuilles/table-list/table-list.component';
import { MatDialogModule, MatPaginatorModule, MatProgressSpinnerModule, MatTableModule, MatTooltipModule, MatPaginatorIntl } from '@angular/material';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {EditPortefeuilleComponent } from './pages/portefeuilles/edit-portefeuille/edit-portefeuille.component';
import {getFrenchPaginatorIntl} from './i18l/MyMatPaginatorIntl';
import { DetailPortefeuilleComponent } from './pages/portefeuilles/detail-portefeuille/detail-portefeuille.component';
import { FormPortefeuilleComponent } from './pages/portefeuilles/form-portefeuille/form-portefeuille.component';
import { ProjetTableListComponent } from './pages/projet/projet-table-list/projet-table-list.component';
import { FormProjetComponent } from './pages/projet/form-projet/form-projet.component';
import { ProjetDetailComponent } from './pages/projet/projet-detail/projet-detail.component';
import { LivrableTableListComponent } from './pages/livrable/livrable-table-list/livrable-table-list.component';
import { FormLivrableComponent } from './pages/livrable/form-livrable/form-livrable.component';
import { LivrableDetailComponent } from './pages/livrable/livrable-detail/livrable-detail.component';
import { getFrenchPaginatorIntl } from './i18l/MyMatPaginatorIntl';


import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');

const httpLoaderFactory = (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    TableListPortefeuilleComponent,
    FormPortefeuilleComponent,
    ProjetTableListComponent,
    EditPortefeuilleComponent,
    DetailPortefeuilleComponent,
    FormProjetComponent,
    LivrableTableListComponent,
    FormLivrableComponent,
    LivrableDetailComponent,
    ProjetDetailComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    AuthModule,
    AdminModule,
    AppRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    TranslateModule.forRoot({
      loader: {provide: TranslateLoader, useFactory: httpLoaderFactory, deps: [HttpClient]}
    }),
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptor,
      multi: true,
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: CatchErrorInterceptor,
      multi: true,
    },
    {
      provide: LOCALE_ID,
      useValue: 'fr'
    },
    {
      provide: MatPaginatorIntl,
      useValue: getFrenchPaginatorIntl()
    }
  ],
  entryComponents: [FormPortefeuilleComponent, FormProjetComponent, EditPortefeuilleComponent, FormLivrableComponent],
  bootstrap: [AppComponent],

})
export class AppModule {
}
