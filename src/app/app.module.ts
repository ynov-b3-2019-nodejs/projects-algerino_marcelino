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
import {TableListComponent} from './pages/portefeuilles/table-list/table-list.component';
import {MatDialogModule, MatPaginatorModule, MatProgressSpinnerModule, MatTableModule, MatTooltipModule} from '@angular/material';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {FormPortefeuilleComponent} from './pages/portefeuilles/form-portefeuille/form-portefeuille.component';
import {ProjetTableListComponent} from './pages/projet/projet-table-list/projet-table-list.component';
import {UserListComponent} from './pages/admin/user/user-list/user-list.component';
import {PopupUserCreateComponent} from './pages/admin/user/popup-user-create/popup-user-create.component';
import {YesNoPopupComponent} from './commons/component/yes-no-popup/yes-no-popup.component';

const httpLoaderFactory = (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    TableListComponent,
    FormPortefeuilleComponent,
    ProjetTableListComponent,
    UserListComponent,
    YesNoPopupComponent,
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
    MatTooltipModule,
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
    }
  ],
  entryComponents: [FormPortefeuilleComponent, PopupUserCreateComponent, YesNoPopupComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
}
