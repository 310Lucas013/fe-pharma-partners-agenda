import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {PatientDto} from '../../dto/patient-dto';
import {Patient} from '../../models/patient';
import {TokenStorageService} from '../token-storage/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  public API_KEY = environment.gatewayApi + 'patients';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json',
      Authorization: this.tokenStorage.getToken()}),
  };

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  createPatient(patientDto: PatientDto): Observable<Patient> {
    return this.http.post<Patient>(this.API_KEY, patientDto, this.httpOptions);
  }

  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.API_KEY, this.httpOptions);
  }

  getPatientsByName(name: string): Observable<any> {
    console.log(name);
    return this.http.get<any>(this.API_KEY + '/findByName/' + name, this.httpOptions);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(this.API_KEY + '/' + id, this.httpOptions);
  }

}
