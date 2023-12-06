import { Component } from '@angular/core';
import { AuthServiceService } from '../shared/services/auth-service.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  user:any = ""

  constructor(private authservice: AuthServiceService){}

  ngOnInit(){
    this.user = this.authservice.getclaims(this.authservice.getAccessToken())
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
