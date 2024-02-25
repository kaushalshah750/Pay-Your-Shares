import { Component } from '@angular/core';
import { AuthServiceService } from '../shared/services/auth-service.service';
import { GlobalVarService } from '../shared/services/global-var.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateGroupComponent } from '../shared/Dialog/create-group/create-group.component';
import { Router } from '@angular/router';

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
    private spinner: NgxSpinnerService,
    private authservice: AuthServiceService,
    private router: Router,
    public globalUser: GlobalVarService
  ){
    this.globalUser.createUser()

  }
  
  ngOnInit(){
    this.user = this.authservice.getclaims(this.authservice.getAccessToken())
    this.userinfo = this.authservice.getUserInfo()
    console.log(this.userinfo.picture)
  }

  createGroup(){
    const dialogRef = this.dialog.open(CreateGroupComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.router.navigate(['/group'])
      }else{
        this.spinner.hide()
      }
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
