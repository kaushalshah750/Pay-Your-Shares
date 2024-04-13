import { Injectable } from '@angular/core';
import { AuthapiService } from './authapi.service';
import { Group, GroupAddResponseOne, GroupResponse, GroupResponseOne } from '../Models/Group';
import { CreateGroup } from '../Models/CreateGroup';
import { Users } from '../Models/Users';
import { GroupInvitationResponse } from '../Models/GroupInvitation';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  url = 'api/groups'

  constructor(
    private authservice: AuthapiService
  ) { }

  getGroupByGroupId(groupId:string){
    return this.authservice.get<GroupResponseOne>(this.url + "/" + groupId)
  }

  deleteGroup(groupId:string){
    return this.authservice.delete<GroupAddResponseOne>(this.url + "/" + groupId + "/delete")
  }

  getGroups(){
    return this.authservice.get<GroupResponse>(this.url)
  }

  getUserInfoByGroup(groupId:string){
    return this.authservice.get<Users[]>(this.url + "/users/" + groupId)
  }

  getAllUserInfoByGroup(groupId:string){
    return this.authservice.get<Users[]>(this.url + "/users/all/" + groupId)
  }

  createGroup(group:CreateGroup){
    return this.authservice.post<GroupResponse>(this.url + "/Create", group)
  }

  addMemberinGroup(reference:any){
    return this.authservice.put<GroupAddResponseOne>(this.url + "/add-members", reference)
  }

  modifyMemberinGroup(group:Group){
    return this.authservice.put<GroupResponseOne>(this.url + "/edit-members", group)
  }
  
  sendInvitation(groupId:string, sendInvite:any){
    return this.authservice.post<GroupInvitationResponse>("api/group-invitation/" + groupId + "/invite", sendInvite)
  }
}
