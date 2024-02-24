import { Injectable } from '@angular/core';
import { AuthapiService } from './authapi.service';
import { Users } from '../Models/Users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'api/User'

  constructor(
    private authservice: AuthapiService
  ) { }

  getUserByGroupId(groupId:string){
    return this.authservice.get<Users[]>(this.url + "/group/" + groupId)
  }
}
