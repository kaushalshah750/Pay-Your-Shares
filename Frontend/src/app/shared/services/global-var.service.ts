import { Injectable } from '@angular/core';
import { UserInfo } from '../Models/UserInfo';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../Dialog/snackbar/snackbar.component';
import { AuthapiService } from './authapi.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalVarService {
  accessTokenKey = 'access_token';
  Uid = 'UId';

  user:UserInfo = {
    User_id: 0,
    Name: "",
    Email: "",
    Picture: "",
    Phone: 0
  }
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  createUser(){
    var userinfo:any = JSON.parse(sessionStorage.getItem("UserInfo")!)
    
    if(userinfo){
      this.user.Name = userinfo.name
      this.user.Email = userinfo.email
      this.user.Picture = userinfo.picture
    }
  }

  decodeToken(token:string){
    return JSON.parse(atob(token.split(".")[1]))
  }

  checkToken(){
    var isValid = this.isTokenExpired(localStorage.getItem(this.accessTokenKey)!)
    
    if(isValid == "Token Not Found"){
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: {
          message: "You are not Authorized",
          status: "error"
        },
        panelClass: ['error-sb']
      });
      this.router.navigate(['/login'])
    }else if (isValid == "Token is Valid"){
      var userInfo = this.decodeToken(localStorage.getItem(this.accessTokenKey)!);
      sessionStorage.setItem('UserInfo', JSON.stringify(userInfo))
      sessionStorage.setItem('UId', userInfo.sub)
    }else if (isValid == "Token is InValid"){
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: {
          message: "You Session is Expired. Please SignIn Again",
          status: "info"
        },
        panelClass: ['info-sb']
      });
      this.router.navigate(['/login'])
    }
  }

  getcurrentdate(){
    const now = new Date();
    const secondsSinceEpoch = Math.floor(now.getTime() / 1000); // Convert milliseconds to seconds
    return secondsSinceEpoch
  }

  isTokenExpired(token: string): string {
    if(token != null){
      const decodedToken = jwt_decode.jwtDecode(token);
      if (decodedToken.exp === undefined) {
        return "Expiry is Undefined";
      }
      const currentDate = this.getcurrentdate()
      const expirationDate = decodedToken.exp
      return expirationDate > currentDate ? "Token is Valid" : "Token is InValid";
    }else{
      return "Token Not Found"
    }
  }
}
