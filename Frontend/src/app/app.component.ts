import { Component } from '@angular/core';
import { AuthServiceService } from './shared/services/auth-service.service';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  // private authUrl: string = environment.authUrl; // Set your authentication URL
  // private clientId: string = environment.clientId; // Set your client ID
  // private scope: string = environment.scope; // Set your scope
  // private tokenStorageKey: string = 'access_token'; // Key for storing/retrieving the token

  // constructor(
  //   private authservice: AuthServiceService,
  //   private router: Router
  // ){
  //   const redirectUri = window.location.origin;
  //   const responseType = 'token';
  //   const authUrl = `${this.authUrl}?client_id=${this.clientId}&redirect_uri=${redirectUri}&scope=${this.scope}&response_type=${responseType}`;
  //   var url = window.location;
  //   var validtoken = url.hash.split("&")[0].replace('#access_token=', '')
  //   if(validtoken){
  //     authservice.setAccessToken(validtoken)
  //     var claims = authservice.getclaims(validtoken)
  //     authservice.setAzureID(claims.oid)
  //     router.navigate(['home'])
  //   }else{
  //     window.location.href = authUrl;
  //   }
  // }

  ngOnInit(){
  }
}
