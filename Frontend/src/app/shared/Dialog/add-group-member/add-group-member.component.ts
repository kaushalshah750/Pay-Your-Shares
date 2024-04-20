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
import { RemoveGroupMember } from '../../Models/RemoveGroupMember';

@Component({
  selector: 'app-add-group-member',
  templateUrl: './add-group-member.component.html',
  styleUrls: ['./add-group-member.component.css']
})
export class AddGroupMemberComponent {
  isLoading:boolean = true
  group:Group = {
    Group_id: 0,
    Name: "",
    Description: "",
    Admin: {
      User_id: 0,
      Name: "",
      Email: "",
      Phone: 0,
      Picture: ""
    },
    Members: [],
    Created_on: "",
    Updated_on: ""
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
        Email: this.addGroupMemberform.controls['Email'].value
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

  removeGroupMemberbyGroupId(userId:number){
    var userDetail = this.group.Members.filter(item => item.User_id == userId)[0]
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        title: "Are you sure?",
        description: "Are you sure you want to remove <b>" + userDetail.Name + "</b> from <b>'" + this.group.Name + "'</b>",
        button: "Remove"
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.isLoading = true
        var removeMember:RemoveGroupMember = {
          Group_id: this.group.Group_id,
          User_id: userId
        }
        this.group.Members = this.group.Members.filter(item => item.User_id !== userId)
        this.groupService.removeMemberfromGroup(removeMember).subscribe((res:GroupResponseOne) => {
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
