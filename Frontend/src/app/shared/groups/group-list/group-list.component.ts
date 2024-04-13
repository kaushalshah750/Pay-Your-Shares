import { Component } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { GroupResponse, Group, GroupAddResponseOne } from '../../Models/Group';
import { GlobalVarService } from '../../services/global-var.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateGroupComponent } from '../../Dialog/create-group/create-group.component';
import { AddGroupMemberComponent } from '../../Dialog/add-group-member/add-group-member.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../Dialog/snackbar/snackbar.component';
import { ConfirmationComponent } from '../../Dialog/confirmation/confirmation.component';
import { AuthapiService } from '../../services/authapi.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent {
  groups:Group[] = []
  isLoading:boolean = false

  constructor(
    private groupService: GroupService,
    private snackBar: MatSnackBar,
    private globalVar: GlobalVarService,
    private authService: AuthapiService,
    public dialog: MatDialog,
  ){}
  
  ngOnInit(){
    this.isLoading = true
    this.globalVar.checkToken()
    this.getGroups()
  }

  getGroups(){
    this.isLoading = true
    this.groupService.getGroups().subscribe((res:GroupResponse)=>{
      if(!res.err){
        this.isLoading = false
        this.groups = res.data
      }
    })
  }
  
  refresh(){
    this.groups = []
    this.getGroups()
  }

  deleteGroup(group:Group){

    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        title: "Are you sure?",
        description: "Are you sure you want to Delete the Group?",
        button: "Delete"
      },
      width: '400px'
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.groupService.deleteGroup(group._id).subscribe((res:GroupAddResponseOne) => {
          if(!res.err){
            if(res.data == "Group is Successfully Deleted"){
              this.isLoading = false
              this.snackBar.openFromComponent(SnackbarComponent, {
                data: {
                  message: "Group is Deleted Successfully",
                  status: "success"
                },
                panelClass: ['success-sb']
              });
              this.getGroups()
            }else if(res.data == "You are not Authorized to delete the Group"){
              this.isLoading = false
              this.snackBar.openFromComponent(SnackbarComponent, {
                data: {
                  message: res.data,
                  status: "info"
                },
                panelClass: ['info-sb']
              });
            }else{
              this.isLoading = false
              this.snackBar.openFromComponent(SnackbarComponent, {
                data: {
                  message: "Group is Already Deleted",
                  status: "success"
                },
                panelClass: ['success-sb']
              });
              this.getGroups()
            }
          }else{
            this.snackBar.openFromComponent(SnackbarComponent, {
              data: {
                message: "We are facing some issue. Please Try Again Later",
                status: "error"
              },
              panelClass: ['error-sb']
            });
          }
        })    
      }
    })

  }

  createGroup(){
    const dialogRef = this.dialog.open(CreateGroupComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getGroups()
      }else{
        this.isLoading = false
      }
    });
  }

  addGroupMember(group:Group){
    const dialogRef = this.dialog.open(AddGroupMemberComponent, {
      data: group._id,
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getGroups()
    });
  }
}
