import { Component } from '@angular/core';
import { AuthServiceService } from '../shared/services/auth-service.service';
import { GlobalVarService } from '../shared/services/global-var.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateGroupComponent } from '../shared/Dialog/create-group/create-group.component';
import { Router } from '@angular/router';
import { GiveFeedbackComponent } from '../shared/Dialog/give-feedback/give-feedback.component';
import { UserService } from '../shared/services/user.service';
import { UsersResponse, UsersResponseOne } from '../shared/Models/Users';
import { AuthUser } from '../shared/Models/AuthUser';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
  standalone: false,
})
export class NavMenuComponent {
  isExpanded = false;
  user: any = ""
  userinfo: any = ""
  currentDate = new Date()

  constructor(
    public dialog: MatDialog,
    private authservice: AuthServiceService,
    public userService: UserService,
    public globalVarService: GlobalVarService,
  ) {
    this.getLoggedInUser()
  }

  ngOnInit() {
    this.user = this.authservice.getclaims(this.globalVarService.getAccessToken())
    this.userinfo = this.authservice.getUserInfo()
    console.log(this.userinfo)
  }

  getLoggedInUser() {
    this.userService.getLoggedInUser().subscribe((res: UsersResponseOne) => {
      this.globalVarService.user.User_id = res.data.User_id
      this.globalVarService.user.Name = res.data.Name
      this.globalVarService.user.Email = res.data.Email
      this.globalVarService.user.Picture = res.data.Picture
      this.globalVarService.user.Phone = res.data.Phone
    }, (error) => {
      if (error.status == 401) {
        this.globalVarService.getRefreshToken(this.globalVarService.getRefreshAccessToken()!).subscribe((res: AuthUser) => {
          if (res.id_token) {
            localStorage.setItem(this.globalVarService.accessTokenKey, res.id_token)
            this.getLoggedInUser()
          }
        })
      }
    })
  }

  giveFeedback() {
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

  signOut() {
    this.authservice.signOut()
  }
}
