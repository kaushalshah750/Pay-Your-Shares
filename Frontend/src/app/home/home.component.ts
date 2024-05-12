import { Component } from '@angular/core';
import { GlobalVarService } from '../shared/services/global-var.service';
import { AuthapiService } from '../shared/services/authapi.service';
import { AuthUser } from '../shared/Models/AuthUser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(
    public globalVarService: GlobalVarService,
  ){
    var token = localStorage.getItem("token")
    var refresh_token = localStorage.getItem("refresh-token")
    console.log(window.location.search.split("&")[0].slice(1,5))
    console.log(window.location.search.split("&")[0].slice(1,5) == "code")
    if (window.location.search.split("&")[0].slice(1,5) == "code"){
      globalVarService.getToken(window.location.search.split("&")[0].slice(6)).subscribe((res:AuthUser) => {
        localStorage.setItem("token", res.id_token)
        localStorage.setItem("refresh_token", res.refresh_token)
        window.location.href = window.location.origin
        var userInfo = this.decodeToken(localStorage.getItem(this.globalVarService.accessTokenKey)!);
        localStorage.setItem('UserInfo', JSON.stringify(userInfo))
      })
    }
  }

  decodeToken(token:string){
    return JSON.parse(atob(token.split(".")[1]))
  }


  ngOnInit(){
    // var url = window.location
    // console.log(url.search)
    // console.log(url.search.split("&"))
    // console.log(url.search.split("&")[0].slice(1,5))
    // console.log(url.search.split("&")[0].slice(6))
    // console.log("url")
  }


}
