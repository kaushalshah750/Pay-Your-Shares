import { Injectable } from '@angular/core';
import { UserInfo } from '../Models/UserInfo';

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
  constructor() { 
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

}
