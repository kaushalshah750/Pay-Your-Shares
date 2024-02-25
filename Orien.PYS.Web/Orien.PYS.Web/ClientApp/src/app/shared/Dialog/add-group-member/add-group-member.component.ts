import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { GroupService } from '../../services/group.service';
import { ActivatedRoute } from '@angular/router';
import { Users } from '../../Models/Users';
import { Group } from '../../Models/Group';
import { GlobalVarService } from '../../services/global-var.service';
import { RemoveGroupMember } from '../../Models/RemoveGroupMember';
import { ToastrService } from 'ngx-toastr';
import { SendGroupInvite } from '../../Models/SendGroupInvite';
import { ResponseData } from '../../Models/ResponseData';
import { EmailBody } from '../../Models/EmailBody';
import { environment } from 'src/environments/environment';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-add-group-member',
  templateUrl: './add-group-member.component.html',
  styleUrls: ['./add-group-member.component.css']
})
export class AddGroupMemberComponent {
  users:Users[] = []
  group:Group = {
    id: 0,
    name: "",
    description: "",
    admin: {
      id: 0,
      name: "",
      email: "",
      phone: "",
      picture: "",
      uId: ""
    },
    members: [],
    created_on: "",
    updated_on: "",
    uId: ""
  }
  addGroupMemberform = this.formBuilder.nonNullable.group({
    Email: ['', [Validators.required, Validators.email]]
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    public globalVar: GlobalVarService,
    private groupService: GroupService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private emailService: EmailService,
    private formBuilder: FormBuilder,
  ){}

  ngOnInit(){
    this.spinner.show()
    this.getGroupInfo()
    this.getAllUserInfoByGroup()
  }

  getAllUserInfoByGroup(){
    this.groupService.getAllUserInfoByGroup(this.data).subscribe((res:Users[]) => {
      this.users = res
    })
  }

  getGroupInfo(){
    this.groupService.getGroupByGroupId(this.data).subscribe((res:Group)=>{
      this.group = res
    })
  }

  inviteMember(){
    var groupInvite:SendGroupInvite = {
      Email: this.addGroupMemberform.controls['Email'].value == "" ? null : this.addGroupMemberform.controls['Email'].value,
      Invite_UId: "",
      Group_UId: this.data,
      Subject: "",
      Body: "",
      IsHTML: true
    }
    
    this.groupService.sendInvitation(groupInvite).subscribe((res:ResponseData) => {
      if(res.response = "Invitation Link Already Sent"){
        this.toastr.info(res.response, "Info")
      }else if(res.response != "Invitation Not Sent, Contact Administrator"){
        this.toastr.success(res.response, "Success")
        this.addGroupMemberform.controls['Email'].setValue('')
      }else{
        this.toastr.error(res.response, "Error")
      }
    }, (error) =>{
      this.toastr.error(error.error.title, "Error")
    })
  }

  removeGroupMemberbyGroupId(userId:string){
    var groupMember:RemoveGroupMember = {
      groupId: this.data,
      userId: userId
    }

    this.groupService.removeMemberinGroup(groupMember).subscribe((res:boolean) => {
      if(res){
        this.toastr.success("The Member is removed from the Group", "Success")
      }else{
        this.toastr.error("The Member is not removed from the Group", "Error")
      }
    })
  }

}
