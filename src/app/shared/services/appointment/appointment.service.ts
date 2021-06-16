import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Appointment} from '../../models/appointment';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {TokenStorageService} from '../token-storage/token-storage.service';

const API_KEY = environment.gatewayApi + 'appointments';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json',
      Authorization: this.tokenStorage.getToken()}),
  };

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }


  addAppointment(appointment: Appointment): Observable<any> {
    return this.http.post<Appointment>(API_KEY + '/create', appointment, this.httpOptions);
  }

  getAppointmentsByEmployeeId(employeeId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(API_KEY + '/employee-id/' + employeeId, this.httpOptions);
  }

  deleteAppointment(appointmentId: number): Observable<any> {
    return this.http.delete(API_KEY + '/' + appointmentId, this.httpOptions);
  }

  updateAppointment(appointment: Appointment): Observable<any> {
    console.log(appointment);
    return this.http.put<Appointment>(API_KEY + '/update/', JSON.stringify(appointment), this.httpOptions);
  }

  setAppointmentStatusAbsent(appointmentId: number): Observable<any> {
    return this.http.get<any>(API_KEY + '/absent/' + appointmentId, this.httpOptions);
  }

  setAppointmentStatusRegistered(appointmentId: number): Observable<any> {
    return this.http.get<any>(API_KEY + '/registered/' + appointmentId, this.httpOptions);
  }

  setAppointmentStatusDone(appointmentId: number): Observable<any> {
    return this.http.get<any>(API_KEY + '/done/' + appointmentId, this.httpOptions);
  }
}
