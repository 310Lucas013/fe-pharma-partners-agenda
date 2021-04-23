import {Injectable} from '@angular/core';

const TOKEN_KEY = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() {
  }

  public saveToken(token: string): void {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.setItem(TOKEN_KEY, 'Bearer ' + token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public signOut(): void {
    sessionStorage.clear();
    window.location.reload();
  }

  public getUsername(): string {
    const jwtData = this.getToken().split('.')[1];
    const decodedJwtJsonData = window.atob(jwtData);
    const decodedJwtData = JSON.parse(decodedJwtJsonData);
    return decodedJwtData.sub;
  }

  // public getId(): string {
  //   const jwtData = this.getToken().split('.')[1];
  //   const decodedJwtJsonData = window.atob(jwtData);
  //   const decodedJwtData = JSON.parse(decodedJwtJsonData);
  //   return decodedJwtData.jti;
  // }
}
