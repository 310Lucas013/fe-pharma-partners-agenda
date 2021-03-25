import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Appointmentdto } from 'src/app/shared/dto/appointmentdto';
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

  addAppointment(appointment: Appointmentdto): Observable<any> {
    return this.http.post<Appointmentdto>(API_KEY + '/add', appointment, httpOptions);
  }
}
