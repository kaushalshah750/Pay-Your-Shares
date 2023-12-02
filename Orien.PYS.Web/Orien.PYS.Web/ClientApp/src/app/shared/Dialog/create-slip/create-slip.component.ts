import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SliptransactionsService } from '../../services/sliptransactions.service';
import { Users } from '../../Models/Users';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../../services/auth-service.service';
import { AddSlip } from '../../Models/AddSlip';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-slip',
  templateUrl: './create-slip.component.html',
  styleUrls: ['./create-slip.component.css']
})
export class CreateSlipComponent {
  users:Users[] = []
  userlist:number[] = []

  createform = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    amount: [0, [Validators.required, Validators.min(10)]],
    paidByUserId: [0, [Validators.required, Validators.min(1)]],
    TransactionDate: [new Date(), Validators.required],
    Users: [[], [Validators.required]]
  })

  constructor(
    public dialogRef: MatDialogRef<CreateSlipComponent>,
    private sliptransactionService: SliptransactionsService,
    private spinner: NgxSpinnerService,
    private authservice: AuthServiceService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(){
    this.getuserslist()
  }

  async getuserslist(){
    this.spinner.show()

    await this.sliptransactionService.getuserlist().subscribe((res:Users[]) => {
      this.users = res
      this.spinner.hide()
    })
  }

  adduser(user:any){
    if(this.userlist.find(u => u == Number(user.target.value))){
      var test:number[] = []

      this.userlist.forEach((element:number) => {
        
        if(element != Number(user.target.value)){
          test.push(element)
        }
      });

      this.userlist = test
    }else{
      this.userlist.push(Number(user.target.value))
    }
    console.log(this.userlist)
  }

  createnewsliptransaction(){
    if (this.createform.valid){
      var Slip:AddSlip = {
        Name: this.createform.controls['name'].value,
        Amount: this.createform.controls['amount'].value,
        PaidByUserId: this.createform.controls['paidByUserId'].value,
        AzureId: this.authservice.getAzureID(),
        TransactionDate: this.createform.controls['TransactionDate'].value,
        Users: this.createform.controls['Users'].value
      }
      this.spinner.show()
      this.sliptransactionService.Addslipayment(Slip).subscribe(() => {
        this.userlist = []
        this.dialogRef.close(true);
      })
    }else{
      this.toastr.info('The info is not correct', 'Success')
    }
  }

  clearfields(){
    this.createform.controls.name.setValue('')
    this.createform.controls.amount.setValue(0)
    this.createform.controls.paidByUserId.setValue(0)
    // this.createform.controls.Users.setValue()
    this.userlist = []
  }


}
