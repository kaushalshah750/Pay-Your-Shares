import { Component } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { GroupResponse, Group, GroupAddResponseOne } from '../../Models/Group';
import { GlobalVarService } from '../../services/global-var.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateGroupComponent } from '../../Dialog/create-group/create-group.component';
import { AddGroupMemberComponent } from '../../Dialog/add-group-member/add-group-member.component';
import { ConfirmationComponent } from '../../Dialog/confirmation/confirmation.component';
import { AuthUser } from '../../Models/AuthUser';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css'],
  standalone: false,
})
export class GroupListComponent {
  groups: Group[] = []
  isLoading: boolean = false

  constructor(
    private groupService: GroupService,
    private snackBarService: SnackbarService,
    private globalVarService: GlobalVarService,
    private snackbarService: SnackbarService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.isLoading = true
    this.getGroups()
  }

  async getGroups() {
    this.isLoading = true
    await this.groupService.getGroups().subscribe((res: GroupResponse) => {
      if (!res.err) {
        this.isLoading = false
        this.groups = res.data
      }
    }, (error) => {
      if (error.status == 401) {
        this.globalVarService.getRefreshToken(this.globalVarService.getRefreshAccessToken()!).subscribe((res: AuthUser) => {
          if (res.id_token) {
            localStorage.setItem(this.globalVarService.accessTokenKey, res.id_token)
            this.getGroups()
          }
        })
      }
    })
  }

  refresh() {
    this.groups = []
    this.getGroups()
  }

  deleteGroup(group: Group) {

    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        title: "Are you sure?",
        description: "Are you sure you want to Delete the Group?",
        button: "Delete"
      },
      width: '400px'
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.groupService.deleteGroup(group.Group_id).subscribe((res: GroupAddResponseOne) => {
          if (!res.err) {
            if (res.data == "Group is Successfully Deleted") {
              this.isLoading = false
              this.snackbarService.openSuccessSnackbar("Group is Deleted Successfully")
              this.getGroups()
            } else if (res.data == "You are not Authorized to delete the Group") {
              this.isLoading = false
              this.snackBarService.openInfoSnackbar(res.data)
            } else {
              this.isLoading = false
              this.snackbarService.openSuccessSnackbar("Group is Already Deleted")
              this.getGroups()
            }
          } else {
            this.snackbarService.openErrorSnackbar("We are facing some issue. Please Try Again Later")
          }
        }, (error) => {
          if (error.status == 401) {
            this.globalVarService.getRefreshToken(this.globalVarService.getRefreshAccessToken()!).subscribe((res: AuthUser) => {
              if (res.id_token) {
                localStorage.setItem(this.globalVarService.accessTokenKey, res.id_token)
                this.deleteGroup(group)
              }
            })
          }
        })
      }
    })

  }

  createGroup() {
    const dialogRef = this.dialog.open(CreateGroupComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getGroups()
      } else {
        this.isLoading = false
      }
    });
  }

  addGroupMember(group: Group) {
    const dialogRef = this.dialog.open(AddGroupMemberComponent, {
      data: group.Group_id,
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getGroups()
    });
  }
}
