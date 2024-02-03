declare var google:any;
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthapiService } from './authapi.service';
import { UserDetails } from '../Models/UserDetails';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private accessTokenKey = 'access_token';
  private azureId = 'AzureID';

  constructor(
    private router: Router
  ) {}

  signOut(){
    google.accounts.id.disableAutoSelect();
    this.router.navigate(['/login'])
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  getAzureID(): string | null {
    return localStorage.getItem(this.azureId);
  }

  getUserInfo():string | null{
    return sessionStorage.getItem("UserInfo");
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
