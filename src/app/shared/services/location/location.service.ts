import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {TokenStorageService} from '../token-storage/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  public API_KEY = environment.gatewayApi + 'locations';

  public httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json',
      Authorization: this.tokenStorage.getToken()}),
  };

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }


  getById(id: number): Observable<any> {
    return this.http.get<any>(this.API_KEY + '/' + id, this.httpOptions);
  }
}
