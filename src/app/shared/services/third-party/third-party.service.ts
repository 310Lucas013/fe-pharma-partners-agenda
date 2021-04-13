import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThirdPartyService {

  public randomApiKey = environment.randommerKey;
  public randomApiSource = environment.randommerApi;

  public httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json',
      'X-Api-Key': this.randomApiKey}),
  };

  constructor(private http: HttpClient) {

  }

  getRandomAdress(): Observable<string> {
    return this.http.get<string>(this.randomApiSource + 'Misc/Random-Address?number=1&culture=nl', this.httpOptions);
  }

  getRandomName(): Observable<string> {
    return this.http.get<string>(this.randomApiSource + 'Name?nameType=fullname&quantity=1', this.httpOptions);
  }

  getRandomPhoneNumber(): Observable<string> {
    return this.http.get<string>(this.randomApiSource + 'Phone/Generate?CountryCode=NL&Quantity=1', this.httpOptions);
  }

  getRandomDossierInformation(): Observable<string> {
    return this.http.get<string>(this.randomApiSource + 'Text/LoremIpsum?loremType=normal&type=paragraphs&number=1', this.httpOptions);
  }

  getRandomDay(): number {
    return (Math.floor(Math.random() * 27) + 1);
  }

  getRandomMonth(): number {
    return (Math.floor(Math.random() * 11) + 1);
  }

  getRandomYear(): number {
    const yearDate = new Date();
    const yearNumber: number = yearDate.getFullYear();
    return (Math.floor(Math.random() * 100) + (yearNumber - 101));
  }
}
