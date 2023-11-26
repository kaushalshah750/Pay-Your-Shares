import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private accessTokenKey = 'access_token';
  private azureId = 'AzureID';

  constructor() {}

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  getAzureID(): string | null {
    return localStorage.getItem(this.azureId);
  }

  setAccessToken(token: string): void {
    localStorage.setItem(this.accessTokenKey, token);
  }

  setAzureID(id: string): void {
    localStorage.setItem(this.azureId, id);
  }

  removeAccessToken(): void {
    localStorage.removeItem(this.accessTokenKey);
  }

  getclaims(token:string | null){
    let decodedJWT:any = ""
    if(token){
      decodedJWT = JSON.parse(window.atob(token.split('.')[1]));
    }
    return decodedJWT
  }
}
