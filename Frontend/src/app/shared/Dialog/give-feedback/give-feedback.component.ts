import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FeedBack, FeedBackResponse } from '../../Models/FeedBack';
import { FeedbackService } from '../../services/feedback.service';
import { GlobalVarService } from '../../services/global-var.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthUser } from '../../Models/AuthUser';

@Component({
  selector: 'app-give-feedback',
  templateUrl: './give-feedback.component.html',
  styleUrls: ['./give-feedback.component.css'],
  standalone: false,
})
export class GiveFeedbackComponent {
  isLoading: boolean = false
  feedbackForm = this.formBuilder.nonNullable.group({
    Feedback: ['', [Validators.required, Validators.minLength(5)]]
  })

  constructor(
    public dialogRef: MatDialogRef<GiveFeedbackComponent>,
    private globalVarService: GlobalVarService,
    private snackBar: MatSnackBar,
    private feedbackService: FeedbackService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    // this.globalVarService.checkToken()
  }

  createFeedback() {
    this.isLoading = true
    var feedback: FeedBack = {
      User_id: this.globalVarService.user.User_id,
      Feedback: this.feedbackForm.controls['Feedback'].value,
      Created_on: new Date()
    }
    this.feedbackService.createFeedback(feedback).subscribe((res: FeedBackResponse) => {
      this.isLoading = false
      if (!res.err) {
        this.dialogRef.close(true)
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: "We have received your valuable feedback. Thank You",
            status: "success"
          },
          panelClass: ['success-sb']
        });
      } else {
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: "We failed to receive your feedback. Please Try Again Later",
            status: "error"
          },
          panelClass: ['error-sb']
        });
      }
    }, (error) => {
      if (error.status == 401) {
        this.globalVarService.getRefreshToken(this.globalVarService.getRefreshAccessToken()!).subscribe((res: AuthUser) => {
          if (res.id_token) {
            localStorage.setItem(this.globalVarService.accessTokenKey, res.id_token)
            this.createFeedback()
          }
        })
      }
    })
  }

}
