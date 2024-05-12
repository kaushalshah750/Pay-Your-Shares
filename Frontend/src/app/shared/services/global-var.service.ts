import { Injectable } from '@angular/core';
import { UserInfo } from '../Models/UserInfo';
import * as jwt_decode from 'jwt-decode';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../Dialog/snackbar/snackbar.component';
import { AuthUser } from '../Models/AuthUser';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalVarService {
  accessTokenKey = 'token';
  refreshAccessTokenKey = 'refresh_token';
  Uid = 'UId';
  tokenUrl:string = "https://oauth2.googleapis.com/token"

  user:UserInfo = {
    User_id: 0,
    Name: "",
    Email: "",
    Picture: "",
    Phone: 0
  }

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient,
  ) {}

  createUser(){
    var userinfo:any = JSON.parse(localStorage.getItem("UserInfo")!)
    
    if(userinfo){
      this.user.Name = userinfo.name
      this.user.Email = userinfo.email
      this.user.Picture = userinfo.picture
    }
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  getRefreshAccessToken(): string | null {
    return localStorage.getItem(this.refreshAccessTokenKey);
  }

  decodeToken(token:string){
    return JSON.parse(atob(token.split(".")[1]))
  }

  async checkToken(){
    var isValid = this.isTokenExpired(localStorage.getItem(this.accessTokenKey)!)
    
    if(isValid == "Token Not Found"){
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: {
          message: "You are not Authorized",
          status: "error"
        },
        panelClass: ['error-sb']
      });
      // this.router.navigate(['/login'])
    }else if (isValid == "Token is Valid"){
      var userInfo = this.decodeToken(localStorage.getItem(this.accessTokenKey)!);
      localStorage.setItem('UserInfo', JSON.stringify(userInfo))
      localStorage.setItem('UId', userInfo.sub)
    }else if (isValid == "Token is InValid"){
      console.log("this.getRefreshAccessToken()!")
      console.log(this.getRefreshAccessToken()!)
      console.log(localStorage.getItem(this.refreshAccessTokenKey))
      await this.getRefreshToken(this.getRefreshAccessToken()!).subscribe((res:AuthUser) => {
        localStorage.setItem(this.accessTokenKey, res.id_token)
      })


      // this.snackBar.openFromComponent(SnackbarComponent, {
      //   data: {
      //     message: "You Session is Expired. Please SignIn Again",
      //     status: "info"
      //   },
      //   panelClass: ['info-sb']
      // });
      // this.router.navigate(['/login'])
    }
  }

  
  getToken(code:string): Observable<AuthUser> {
    var Header = {
      "user-agent": "google-oauth-playground",
      "content-type": "application/x-www-form-urlencoded"
    }
    return this.http.post<AuthUser>(`${this.tokenUrl}?code=${code}&redirect_uri=${window.location.origin}/&client_id=${environment.google.client_id}&client_secret=${environment.google.client_secret}&grant_type=authorization_code&response_type=token&scope=https://www.googleapis.com/auth/userinfo.email`, Header);
  }

  getRefreshToken(refresh_token:string): Observable<AuthUser> {
    var Header = {
      "user-agent": "google-oauth-playground",
      "content-type": "application/x-www-form-urlencoded"
    }
    return this.http.post<AuthUser>(`${this.tokenUrl}?client_id=${environment.google.client_id}&client_secret=${environment.google.client_secret}&grant_type=refresh_token&refresh_token=${refresh_token}`, Header);
  }


  getcurrentdate(){
    const now = new Date();
    const secondsSinceEpoch = Math.floor(now.getTime() / 1000); // Convert milliseconds to seconds
    return secondsSinceEpoch
  }

  isTokenExpired(token: string): string {
    if(token != null){
      const decodedToken = jwt_decode.jwtDecode(token);
      if (decodedToken.exp === undefined) {
        return "Expiry is Undefined";
      }
      const currentDate = this.getcurrentdate()
      const expirationDate = decodedToken.exp
      return expirationDate > currentDate ? "Token is Valid" : "Token is InValid";
    }else{
      return "Token Not Found"
    }
  }
}
