import { Injectable } from '@angular/core';
import { UserInfo } from '../Models/UserInfo';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GlobalVarService {
  accessTokenKey = 'access_token';
  Uid = 'UId';

  user:UserInfo = {
    uid: "",
    name: "",
    email: "",
    picture: ""
  }
  constructor(
    private router: Router,
    private toastr: ToastrService,
    ) { 
    this.createUser()
  }

  createUser(){
    var userinfo:any = JSON.parse(sessionStorage.getItem("UserInfo")!)

    if(userinfo){
      this.user.uid = userinfo.sub
      this.user.name = userinfo.name
      this.user.email = userinfo.email
      this.user.picture = userinfo.picture
    }
  }

  decodeToken(token:string){
    return JSON.parse(atob(token.split(".")[1]))
  }

  checkToken(){
    var isValid = this.isTokenExpired(localStorage.getItem(this.accessTokenKey)!)
    
    if(isValid == "Token Not Found"){
      this.toastr.error('You are not Authorized', 'Error')
      this.router.navigate(['/login'])
    }else if (isValid == "Token is Valid"){
      var userInfo = this.decodeToken(localStorage.getItem(this.accessTokenKey)!);
      sessionStorage.setItem('UserInfo', JSON.stringify(userInfo))
      sessionStorage.setItem('UId', userInfo.sub)
    }else if (isValid == "Token is InValid"){
      this.toastr.info('You Session is Expired. Please SignIn Again', 'Info')
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
