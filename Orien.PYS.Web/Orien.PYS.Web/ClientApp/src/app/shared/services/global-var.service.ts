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

  checkToken(){
    var isValid = this.isTokenExpired(localStorage.getItem(this.accessTokenKey)!)
    var UserInfo = sessionStorage.getItem('UserInfo')
    var UId = sessionStorage.getItem('UId')

    if(!isValid || (UserInfo == null || UserInfo == "") || (UId == null || UId == "")){
      this.toastr.info('You are not Authorized', 'Info')
      this.router.navigate(['/login'])
    }
  }

  getcurrentdate(){
    const now = new Date();
    const secondsSinceEpoch = Math.floor(now.getTime() / 1000); // Convert milliseconds to seconds
    return secondsSinceEpoch
  }

  isTokenExpired(token: string): boolean {
    if(token != null){
      const decodedToken = jwt_decode.jwtDecode(token);
      if (decodedToken.exp === undefined) {
        return false;
      }
      const currentDate = this.getcurrentdate()
      const expirationDate = decodedToken.exp
      return expirationDate > currentDate;
    }else{
      return false
    }
  }

}
