import { Component } from '@angular/core';
import { AuthServiceService } from '../shared/services/auth-service.service';
import { GlobalVarService } from '../shared/services/global-var.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateGroupComponent } from '../shared/Dialog/create-group/create-group.component';
import { Router } from '@angular/router';
import { GiveFeedbackComponent } from '../shared/Dialog/give-feedback/give-feedback.component';
import { UserService } from '../shared/services/user.service';
import { UsersResponse, UsersResponseOne } from '../shared/Models/Users';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  user:any = ""
  userinfo:any = ""
  currentDate = new Date()

  constructor(
    public dialog: MatDialog,
    private authservice: AuthServiceService,
    private router: Router,
    public userService: UserService,
    public globalVar: GlobalVarService,
  ){
    this.userService.getLoggedInUser().subscribe((res:UsersResponseOne) => {
      this.globalVar.user.User_id = res.data.User_id
      this.globalVar.user.Name = res.data.Name
      this.globalVar.user.Email = res.data.Email
      this.globalVar.user.Picture = res.data.Picture
      this.globalVar.user.Phone = res.data.Phone
    })
  }
  
  ngOnInit(){
    this.user = this.authservice.getclaims(this.authservice.getAccessToken())
    this.userinfo = this.authservice.getUserInfo()
  }

  giveFeedback(){
    const dialogRef = this.dialog.open(GiveFeedbackComponent, {
      width: "400px"
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  signOut(){
    this.authservice.signOut()
  }
}
