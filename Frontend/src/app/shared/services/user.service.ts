import { Injectable } from '@angular/core';
import { AuthapiService } from './authapi.service';
import { Users, UsersResponse, UsersResponseOne, UsersResponseString } from '../Models/Users';
import { GroupSummaryResponse } from '../Models/GroupSummary';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'api/users'

  constructor(
    private authservice: AuthapiService
  ) { }

  getLoggedIn(){
    return this.authservice.get<UsersResponseOne>("unauth/users/loggedin")
  }

  getLoggedInUser(){
    return this.authservice.get<UsersResponseOne>(this.url + "/loggedin")
  }

  getGroupSummaryUsers(groupId:string){
    return this.authservice.get<UsersResponse>(this.url + "/group/" + groupId + "/summary/users")
  }

  getGroupSummary(groupId:string){
    return this.authservice.get<GroupSummaryResponse>(this.url + "/group/" + (groupId != null ? groupId + "/summary" : "summary"))
  }

  checkUser(){
    return this.authservice.get<UsersResponseString>(this.url + "/check-user")
  }

  updateUser(user:Users){
    return this.authservice.post<UsersResponseString>(this.url + "/update-user", user)
  }
}
