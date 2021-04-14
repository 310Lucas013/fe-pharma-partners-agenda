import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Employee} from '../../models/employee';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http: HttpClient
  ) { }

  getAllEmployees(): Observable<any> {
    let url = 'http://localhost:8888/employees/all';
    return this.http.get<Employee[]>(url);
  }
}
