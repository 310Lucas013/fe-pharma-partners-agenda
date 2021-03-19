import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import {CommonModule, registerLocaleData} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {RoutingController} from './RoutingController';
import {MaterialModule} from './material-module';
import { LoginComponent } from './login/login.component';
import { AgendaComponent } from './agenda/agenda.component';
import { AppointmentSearchComponent } from './appointment-search/appointment-search.component';
import { ClientOverviewComponent } from './client-overview/client-overview.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ClockComponent } from './agenda/clock/clock.component';
import { SideCalendarComponent } from './agenda/side-calendar/side-calendar.component';
import { MainCalendarComponent } from './agenda/main-calendar/main-calendar.component';
import { CoworkerOverviewComponent } from './agenda/coworker-overview/coworker-overview.component';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {FlatpickrModule} from 'angularx-flatpickr';
import { AppointmentModalComponent } from './agenda/main-calendar/appointment-modal/appointment-modal.component';
import { AgendaEmployeeComponent } from './agenda-employee/agenda-employee.component';
import localeNl from '@angular/common/locales/nl';

registerLocaleData(localeNl);

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    LoginComponent,
    AgendaComponent,
    AppointmentSearchComponent,
    ClientOverviewComponent,
    NavigationComponent,
    ClockComponent,
    SideCalendarComponent,
    MainCalendarComponent,
    CoworkerOverviewComponent,
    AppointmentModalComponent,
    AgendaEmployeeComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    RoutingController,
    MaterialModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
