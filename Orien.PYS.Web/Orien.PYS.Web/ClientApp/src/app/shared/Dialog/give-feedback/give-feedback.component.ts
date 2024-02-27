import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { GroupService } from '../../services/group.service';
import { CreateGroup } from '../../Models/CreateGroup';
import { FeedBack } from '../../Models/FeedBack';
import { FeedbackService } from '../../services/feedback.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalVarService } from '../../services/global-var.service';

@Component({
  selector: 'app-give-feedback',
  templateUrl: './give-feedback.component.html',
  styleUrls: ['./give-feedback.component.css']
})
export class GiveFeedbackComponent {
  feedbackForm = this.formBuilder.nonNullable.group({
    Feedback: ['', [Validators.required, Validators.minLength(5)]]
  })

  constructor(
    private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<GiveFeedbackComponent>,
    private toastr: ToastrService,
    private globalVar: GlobalVarService,
    private feedbackService: FeedbackService,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(){
    this.globalVar.checkToken()
  }

  createFeedback(){
    this.spinner.show()
    var feedback:FeedBack = {
      FeedBack: this.feedbackForm.controls['Feedback'].value,
    }
    this.feedbackService.createFeedback(feedback).subscribe((res:boolean) => {
      if(res == true){
        this.dialogRef.close(true)
        this.toastr.success("We have received your valuable feedback. Thank You", "Success")
      }else{
        this.toastr.error("We failed to receive your feedback. Please try again", "Error")
      }
    })
  }

  clearfields(){
    this.feedbackForm.controls.Feedback.setValue('')
  }

}
