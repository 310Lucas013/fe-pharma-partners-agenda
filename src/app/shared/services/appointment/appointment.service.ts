import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Appointment} from '../../models/appointment';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

const API_KEY = environment.gatewayApi + 'appointments';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(
    private http: HttpClient
  ) { }

  addAppointment(appointment: Appointment): Observable<any> {
    return this.http.post<Appointment>(API_KEY + '/create', appointment, httpOptions);
  }

  getAppointmentsByEmployeeId(employeeId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(API_KEY + '/employee-id/' + employeeId);
  }
}
