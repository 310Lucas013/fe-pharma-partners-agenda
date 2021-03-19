import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppointmentDto } from 'src/app/shared/dto/appointmentDto';
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

  addAppointment(appointment: AppointmentDto) : Observable<any> {
    return this.http.post<AppointmentDto>(API_KEY + "/add", appointment, httpOptions);
  }
}
