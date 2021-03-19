import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  public saveToken(token: string): void{
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.setItem(TOKEN_KEY, token);
    console.log(token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public signOut(): void{
    sessionStorage.clear();
    window.location.reload();
  }
}
