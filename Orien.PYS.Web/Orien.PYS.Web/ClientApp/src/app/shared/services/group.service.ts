import { Injectable } from '@angular/core';
import { AuthapiService } from './authapi.service';
import { Group } from '../Models/Group';
import { CreateGroup } from '../Models/CreateGroup';
import { Users } from '../Models/Users';
import { RemoveGroupMember } from '../Models/RemoveGroupMember';
import { SendGroupInvite } from '../Models/SendGroupInvite';
import { ResponseData } from '../Models/ResponseData';

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

  getUserInfoByGroup(groupId:string){
    return this.authservice.get<Users[]>(this.url + "/users/" + groupId)
  }

  getAllUserInfoByGroup(groupId:string){
    return this.authservice.get<Users[]>(this.url + "/users/all/" + groupId)
  }

  createGroup(group:CreateGroup){
    return this.authservice.post<boolean>(this.url + "/Create", group)
  }

  removeMemberinGroup(group:RemoveGroupMember){
    return this.authservice.post<boolean>(this.url + "/user/delete", group)
  }
  
  sendInvitation(sendInvite:SendGroupInvite){
    return this.authservice.post<ResponseData>(this.url + "/invite", sendInvite)
  }
}
