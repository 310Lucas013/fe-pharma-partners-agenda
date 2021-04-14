import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Credentials } from 'src/app/shared/models/Credentials';
import { environment } from '../../../../environments/environment';

const API_KEY = environment.gatewayApi + 'credentials';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient
  ) { }

  login(credentials: Credentials): Observable<any> {
    return this.http.post(
      API_KEY + '/authenticate',
      {
        username: credentials.username,
        password: credentials.password,
      },
      httpOptions
    );
  }

  register(credentials: Credentials): Observable<any> {
    return this.http.post(
      API_KEY + '/register',
      {
        username: credentials.username,
        password: credentials.password,
      },
      httpOptions
    );
  }
}
