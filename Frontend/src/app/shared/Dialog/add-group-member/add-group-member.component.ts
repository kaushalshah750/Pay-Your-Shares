import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { GroupService } from '../../services/group.service';
import { Group, GroupResponseOne } from '../../Models/Group';
import { GlobalVarService } from '../../services/global-var.service';
import { GroupInvitationResponse } from '../../Models/GroupInvitation';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { RemoveGroupMember } from '../../Models/RemoveGroupMember';
import { AuthUser } from '../../Models/AuthUser';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-add-group-member',
  templateUrl: './add-group-member.component.html',
  styleUrls: ['./add-group-member.component.css'],
  standalone: false,
})
export class AddGroupMemberComponent {
  isLoading: boolean = true
  group: Group = {
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
    public globalVarService: GlobalVarService,
    private groupService: GroupService,
    private snackBarService: SnackbarService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    // this.globalVarService.checkToken()
    this.getGroupInfo()
  }

  getGroupInfo() {
    this.isLoading = true
    this.groupService.getGroupByGroupId(this.data).subscribe((res: GroupResponseOne) => {
      this.isLoading = false
      this.group = res.data
    }, (error) => {
      if (error.status == 401) {
        this.globalVarService.getRefreshToken(this.globalVarService.getRefreshAccessToken()!).subscribe((res: AuthUser) => {
          if (res.id_token) {
            localStorage.setItem(this.globalVarService.accessTokenKey, res.id_token)
            this.getGroupInfo()
          }
        })
      }
    })
  }

  inviteMember() {
    this.isLoading = true
    if (this.addGroupMemberform.valid) {
      var groupInvite: any = {
        Email: this.addGroupMemberform.controls['Email'].value
      }
      this.groupService.sendInvitation(this.data, groupInvite).subscribe((res: GroupInvitationResponse) => {
        this.isLoading = false
        if (!res.err) {
          this.snackBarService.openSuccessSnackbar("Invitation Sent Successfully")
          this.addGroupMemberform.controls['Email'].setValue('')
        } else {
          this.snackBarService.openErrorSnackbar("Failed to Send the Invitation Link, Try Again")
        }
      }, (error) => {
        if (error.status == 401) {
          this.globalVarService.getRefreshToken(this.globalVarService.getRefreshAccessToken()!).subscribe((res: AuthUser) => {
            if (res.id_token) {
              localStorage.setItem(this.globalVarService.accessTokenKey, res.id_token)
              this.inviteMember()
            }
          })
        }
      })
    }
  }

  removeGroupMemberbyGroupId(userId: number) {
    var userDetail = this.group.Members.filter(item => item.User_id == userId)[0]
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        title: "Are you sure?",
        description: "Are you sure you want to remove <b>" + userDetail.Name + "</b> from <b>'" + this.group.Name + "'</b>",
        button: "Remove"
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading = true
        var removeMember: RemoveGroupMember = {
          Group_id: this.group.Group_id,
          User_id: userId
        }
        this.group.Members = this.group.Members.filter(item => item.User_id !== userId)
        this.groupService.removeMemberfromGroup(removeMember).subscribe((res: GroupResponseOne) => {
          this.isLoading = false
          if (!res.err) {
            this.getGroupInfo()
            this.snackBarService.openSuccessSnackbar("The Member is removed from the Group")
          } else {
            this.snackBarService.openErrorSnackbar("The Member is not removed from the Group")
          }
        }, (error) => {
          if (error.status == 401) {
            this.globalVarService.getRefreshToken(this.globalVarService.getRefreshAccessToken()!).subscribe((res: AuthUser) => {
              if (res.id_token) {
                localStorage.setItem(this.globalVarService.accessTokenKey, res.id_token)
                this.removeGroupMemberbyGroupId(userId)
              }
            })
          }
        })
      }
    })

  }

}
