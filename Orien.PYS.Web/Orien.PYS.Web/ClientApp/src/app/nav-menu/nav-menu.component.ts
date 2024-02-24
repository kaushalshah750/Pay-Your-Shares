import { Component } from '@angular/core';
import { AuthServiceService } from '../shared/services/auth-service.service';
import { GlobalVarService } from '../shared/services/global-var.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  user:any = ""
  userinfo:any = ""

  constructor(
    private authservice: AuthServiceService,
    public globalUser: GlobalVarService
  ){
    this.globalUser.createUser()

  }
  
  ngOnInit(){
    this.user = this.authservice.getclaims(this.authservice.getAccessToken())
    this.userinfo = this.authservice.getUserInfo()
    console.log(this.userinfo.picture)
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
