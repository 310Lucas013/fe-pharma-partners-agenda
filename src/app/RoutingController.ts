import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {LoginComponent} from './login/login.component';
import {AppointmentSearchComponent} from './appointment-search/appointment-search.component';
import {AgendaComponent} from './agenda/agenda.component';
import {ClientOverviewComponent} from './client-overview/client-overview.component';
import {AgendaEmployeeComponent} from './agenda-employee/agenda-employee.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: AgendaEmployeeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'agenda', component: AgendaComponent},
  {path: 'agenda/:id', component: AgendaComponent},
  {path: 'appointmentsearch', component: AppointmentSearchComponent},
  {path: 'clientoverview', component: ClientOverviewComponent},
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
