import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Appointment } from '../../class/appointment';
import { Observable } from 'rxjs';

const API_KEY = 'http://localhost:5004/appointments';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(
    private http: HttpClient
  ) { }

  addAppointment(appointment: Appointment) {
    this.http.post<Appointment>(API_KEY + "/add", appointment, httpOptions);
  }
}
