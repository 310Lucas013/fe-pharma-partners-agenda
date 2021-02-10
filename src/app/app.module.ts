import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import {CommonModule} from '@angular/common';
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
    CoworkerOverviewComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
