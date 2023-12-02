import { Injectable } from '@angular/core';
import { AuthapiService } from './authapi.service';
import { Group } from '../Models/Group';
import { AddGroupMember } from '../Models/AddGroupMember';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  url = 'api/Groups'

  constructor(
    private authservice: AuthapiService
  ) { }

  createGroup(group:Group){
    return this.authservice.post<Group>(this.url + "/Add", group)
  }

  createGroupMember(group:AddGroupMember){
    return this.authservice.post<boolean>(this.url + "/add-member", group)
  }

}
