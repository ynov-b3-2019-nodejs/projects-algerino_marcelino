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
 UserListComponent} from './pages/admin/user/user-list/user-list.component';
import {PopupUserCreateComponent} from './pages/admin/user/popup-user-create/popup-user-create.component';
import {YesNoPopupComponent} from './commons/component/yes-no-popup/yes-no-popup.component';
import { MatDialogModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatTooltipModule,
  MatPaginatorIntl
} from '@angular/material';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {EditPortefeuilleComponent } from './pages/portefeuilles/edit-portefeuille/edit-portefeuille.component';
import { DetailPortefeuilleComponent } from './pages/portefeuilles/detail-portefeuille/detail-portefeuille.component';
import {FormPortefeuilleComponent} from './pages/portefeuilles/form-portefeuille/form-portefeuille.component';
import {ProjetTableListComponent} from './pages/projet/projet-table-list/projet-table-list.component';
import {FormProjetComponent} from './pages/projet/form-projet/form-projet.component';
import {ProjetDetailComponent} from './pages/projet/projet-detail/projet-detail.component';
import {LivrableTableListComponent} from './pages/livrable/livrable-table-list/livrable-table-list.component';
import {FormLivrableComponent} from './pages/livrable/form-livrable/form-livrable.component';
import {LivrableDetailComponent} from './pages/livrable/livrable-detail/livrable-detail.component';
import {getFrenchPaginatorIntl} from './i18l/MyMatPaginatorIntl';
import { CalendrierEventListComponent } from './pages/calendrier/calendrier-event-list/calendrier-event-list.component';
import { CalendrierEventFormComponent } from './pages/calendrier/calendrier-event-form/calendrier-event-form.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { CalendrierEventDetailsComponent } from './pages/calendrier/calendrier-event-details/calendrier-event-details.component';

import { ChatComponent } from './commons/component/chat/chat.component';

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
    UserListComponent,
    YesNoPopupComponent,
    EditPortefeuilleComponent,
    DetailPortefeuilleComponent,
    FormProjetComponent,
    LivrableTableListComponent,
    FormLivrableComponent,
    LivrableDetailComponent,
    ProjetDetailComponent,
    CalendrierEventListComponent,
    CalendrierEventFormComponent,
    CalendrierEventDetailsComponent,
    ChatComponent,
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
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
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
  entryComponents: [FormPortefeuilleComponent, PopupUserCreateComponent, YesNoPopupComponent, FormProjetComponent, EditPortefeuilleComponent, FormLivrableComponent, CalendrierEventFormComponent, CalendrierEventDetailsComponent],
  bootstrap: [AppComponent],
})

export class AppModule {
}
