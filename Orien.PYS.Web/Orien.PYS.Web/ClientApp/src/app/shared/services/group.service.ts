import { Injectable } from '@angular/core';
import { AuthapiService } from './authapi.service';
import { Group } from '../Models/Group';
import { AddGroupMember } from '../Models/AddGroupMember';
import { CreateGroup } from '../Models/CreateGroup';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  url = 'api/Groups'

  constructor(
    private authservice: AuthapiService
  ) { }

  getGroupByGroupId(groupId:string){
    return this.authservice.get<Group>(this.url + "/" + groupId)
  }

  getGroups(){
    return this.authservice.get<Group[]>(this.url)
  }

  createGroup(group:CreateGroup){
    return this.authservice.post<boolean>(this.url + "/Create", group)
  }

  createGroupMember(group:AddGroupMember){
    return this.authservice.post<boolean>(this.url + "/add-member", group)
  }

}
