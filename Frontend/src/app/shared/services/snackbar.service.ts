import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../Dialog/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private snackBar: MatSnackBar,
  ) { }

  openSuccessSnackbar(message:string){
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        message: message,
        status: "success"
      },
      panelClass: ['success-sb']
    });
  }

  openErrorSnackbar(message:string){
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        message: message,
        status: "error"
      },
      panelClass: ['error-sb']
    });
  }

  openInfoSnackbar(message:string){
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        message: message,
        status: "info"
      },
      panelClass: ['info-sb']
  });
  }

}
