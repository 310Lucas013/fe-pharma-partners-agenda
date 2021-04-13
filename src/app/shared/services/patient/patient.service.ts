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

  public httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json',
      Authorization: this.tokenStorage.getToken()}),
  };

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  createPatient(patientDto: PatientDto): Observable<Patient> {
    return this.http.post<Patient>(this.API_KEY, patientDto, this.httpOptions);
  }

}
