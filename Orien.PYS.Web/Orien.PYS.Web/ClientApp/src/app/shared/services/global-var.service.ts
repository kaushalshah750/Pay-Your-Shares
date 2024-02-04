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
  constructor() { }

  createUser(){
    var token = this.getAccessToken()
    var userinfo:any = this.decodeToken(token!)
    this.user.uid = userinfo.sub
    this.user.name = userinfo.name
    this.user.email = userinfo.email
    this.user.picture = userinfo.picture
  }

  decodeToken(token:string){
    return JSON.parse(atob(token.split(".")[1]))
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

}
