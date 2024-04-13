import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { GroupService } from '../../services/group.service';
import { Group, GroupResponseOne } from '../../Models/Group';
import { GlobalVarService } from '../../services/global-var.service';
import { GroupInvitationResponse } from '../../Models/GroupInvitation';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { Users } from '../../Models/Users';

@Component({
  selector: 'app-add-group-member',
  templateUrl: './add-group-member.component.html',
  styleUrls: ['./add-group-member.component.css']
})
export class AddGroupMemberComponent {
  isLoading:boolean = true
  group:Group = {
    _id: "",
    name: "",
    description: "",
    admin: {
      _id: "",
      name: "",
      email: "",
      phone: 0,
      picture: "",
      last_login: "",
      uid: ""
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
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
  ){}

  ngOnInit(){
    this.globalVar.checkToken()
    this.getGroupInfo()
  }
  
  getGroupInfo(){
    this.isLoading = true
    this.groupService.getGroupByGroupId(this.data).subscribe((res:GroupResponseOne)=>{
      this.isLoading = false
      this.group = res.data
    })
  }

  inviteMember(){
    this.isLoading = true
    if(this.addGroupMemberform.valid){
      var groupInvite:any = {
        email: this.addGroupMemberform.controls['Email'].value
      }
      this.groupService.sendInvitation(this.data, groupInvite).subscribe((res:GroupInvitationResponse) => {
        this.isLoading = false
        if(!res.err){
          this.snackBar.openFromComponent(SnackbarComponent, {
            data: {
              message: "Invitation Sent Successfully",
              status: "success"
            },
            panelClass: ['success-sb']
          });
          this.addGroupMemberform.controls['Email'].setValue('')
        }else{
          this.snackBar.openFromComponent(SnackbarComponent, {
            data: {
              message: "Failed to Send the Invitation Link, Try Again",
              status: "error"
            },
            panelClass: ['error-sb']
          });
        }
      }, (error) =>{
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: error.error.title,
            status: "error"
          },
          panelClass: ['error-sb']
        });
      })
    }
  }

  removeGroupMemberbyGroupId(userId:string){
    var userDetail = this.group.members.filter(item => item.uid == userId)[0]
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        title: "Are you sure?",
        description: "Are you sure you want to remove <b>" + userDetail.name + "</b> from <b>'" + this.group.name + "'</b>",
        button: "Remove"
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.isLoading = true
        this.group.members = this.group.members.filter(item => item.uid !== userId)
        this.groupService.modifyMemberinGroup(this.group).subscribe((res:GroupResponseOne) => {
          this.isLoading = false
          if(!res.err){
            this.getGroupInfo()
            this.snackBar.openFromComponent(SnackbarComponent, {
              data: {
                message: "The Member is removed from the Group",
                status: "success"
              },
              panelClass: ['success-sb']
            });
          }else{
            this.snackBar.openFromComponent(SnackbarComponent, {
              data: {
                message: "The Member is not removed from the Group",
                status: "error"
              },
              panelClass: ['error-sb']
            });
          }
        })  
      }
    })

  }

}
