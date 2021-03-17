import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Credentials } from 'src/models/Credentials';

const AUTH_API = 'http://localhost:4000/';

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
      AUTH_API + 'authenticate',
      {
        Username: credentials.username,
        Password: credentials.password,
      },
      httpOptions
    );
  }
}
