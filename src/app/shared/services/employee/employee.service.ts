import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Employee} from '../../models/employee';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {TokenStorageService} from '../token-storage/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json',
      Authorization: this.tokenStorage.getToken()}),
  };

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }


  getAllEmployees(): Observable<Employee[]> {
    let url = environment.gatewayApi + 'employees/all';
    return this.http.get<Employee[]>(url, this.httpOptions);
  }
}
