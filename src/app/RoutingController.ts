import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {LoginComponent} from './login/login.component';
import {AppointmentSearchComponent} from './appointment-search/appointment-search.component';
import {AgendaComponent} from './agenda/agenda.component';
import {ClientOverviewComponent} from './client-overview/client-overview.component';
import {AuthguardService} from './shared/services/authGuard/authguard.service';
import {AgendaEmployeeComponent} from './agenda-employee/agenda-employee.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: AgendaEmployeeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'agenda', component: AgendaComponent, canActivate: [AuthguardService]},
  {path: 'agenda/:id', component: AgendaComponent, canActivate: [AuthguardService]},
  {path: 'appointmentsearch', component: AppointmentSearchComponent, canActivate: [AuthguardService]},
  {path: 'clientoverview', component: ClientOverviewComponent, canActivate: [AuthguardService]},
  {path: 'agenda', component: AgendaComponent, canActivate: [AuthguardService]},
  {path: 'appointmentsearch', component: AppointmentSearchComponent, canActivate: [AuthguardService]},
  {path: 'clientoverview', component: ClientOverviewComponent, canActivate: [AuthguardService]},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {enableTracing: true} // <-- debugging purposes only
    ),
  ]
})
export class RoutingController {
}
