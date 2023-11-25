import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private accessTokenKey = 'access_token';

  constructor() {}

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  setAccessToken(token: string): void {
    localStorage.setItem(this.accessTokenKey, token);
  }

  removeAccessToken(): void {
    localStorage.removeItem(this.accessTokenKey);
  }

  getclaims(token:string | null){
    let decodedJWT = ""
    if(token){
      decodedJWT = JSON.parse(window.atob(token.split('.')[1]));
    }
    console.log(decodedJWT)
  }
}
