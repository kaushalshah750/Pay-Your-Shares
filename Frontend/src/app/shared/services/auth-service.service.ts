declare var google: any;
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthapiService } from './authapi.service';
import { UserDetails } from '../Models/UserDetails';
import { GlobalVarService } from './global-var.service';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../Dialog/snackbar/snackbar.component';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(
    private router: Router,
    private globalVar: GlobalVarService,
    private snackBarService: SnackbarService,
  ) { }

  async signOut() {
    await google.accounts.id.disableAutoSelect();
    localStorage.removeItem(this.globalVar.accessTokenKey)
    await this.router.navigate(['/login']).then(() => {
      this.snackBarService.openSuccessSnackbar("You have been successfully Logged Out")
    })
  }

  getAzureID(): string | null {
    return localStorage.getItem(this.globalVar.Uid);
  }

  getUserInfo(): string | null {
    return JSON.parse(localStorage.getItem("UserInfo")!);
  }

  setAccessToken(token: string): void {
    localStorage.setItem(this.globalVar.accessTokenKey, token);
  }

  setAzureID(id: string): void {
    localStorage.setItem(this.globalVar.Uid, id);
  }

  removeAccessToken(): void {
    localStorage.removeItem(this.globalVar.accessTokenKey);
  }

  getclaims(token: string | null) {
    let decodedJWT: any = ""
    if (token) {
      decodedJWT = JSON.parse(window.atob(token.split('.')[1]));
    }
    return decodedJWT
  }
}
