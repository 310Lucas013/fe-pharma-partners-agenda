import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Appointment} from '../../class/appointment';
import {Observable} from 'rxjs';

const AUTH_API = 'http://localhost:5000/';

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

  login(appointment: Appointment): Observable<any> {
    return this.http.post(
      AUTH_API + 'create',
      {
        title: appointment.title,
        start: appointment.start,
        end: appointment.end,
        color: appointment.color,
        draggable: appointment.draggable,
        resizable: appointment.resizable,
        type: appointment.type,
        date: appointment.date,
        time: appointment.time,
        duration: appointment.duration,
        location: appointment.location,
        doctorName: appointment.doctorName,
        patientName: appointment.patientName,
        patientStreetNameNumber: appointment.patientStreetNameNumber,
        patientDateOfBirth: appointment.patientDateOfBirth,
        patientPostalCode: appointment.patientPostalCode,
        reasonSelection: appointment.reasonSelection,
        reasonText: appointment.reasonText,
        attentionLineText: appointment.attentionLineText
      },
      httpOptions
    );
  }
}
