declare var google:any;
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthapiService } from './authapi.service';
import { UserDetails } from '../Models/UserDetails';
import { GlobalVarService } from './global-var.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(
    private router: Router,
    private globalVar: GlobalVarService,
    private toastr: ToastrService,

  ) {}

  signOut(){
    google.accounts.id.disableAutoSelect();
    this.router.navigate(['/login']).then(() =>{
      this.toastr.success('You have been successfully Logged Out', 'Success')
      localStorage.removeItem(this.globalVar.accessTokenKey)
    })
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.globalVar.accessTokenKey);
  }

  getAzureID(): string | null {
    return sessionStorage.getItem(this.globalVar.Uid);
  }

  getUserInfo():string | null{
    return JSON.parse(sessionStorage.getItem("UserInfo")!);
  }

  setAccessToken(token: string): void {
    localStorage.setItem(this.globalVar.accessTokenKey, token);
  }

  setAzureID(id: string): void {
    localStorage.setItem(this.globalVar.Uid, id);
  }

  removeAccessToken(): void {
    localStorage.removeItem(this.globalVar.accessTokenKey);
  }

  getclaims(token:string | null){
    let decodedJWT:any = ""
    if(token){
      decodedJWT = JSON.parse(window.atob(token.split('.')[1]));
    }
    return decodedJWT
  }
}
