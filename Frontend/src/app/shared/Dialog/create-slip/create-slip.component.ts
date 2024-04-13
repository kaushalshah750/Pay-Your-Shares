import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SliptransactionsService } from '../../services/sliptransactions.service';
import { Users } from '../../Models/Users';
import { AddSlip } from '../../Models/AddSlip';
import { FormBuilder, Validators } from '@angular/forms';
import { EmailBody, EmailResponse } from '../../Models/EmailBody';
import { EmailService } from '../../services/email.service';
import { SlipResponse, SlipTransactionVM } from '../../Models/SlipTransactionVM';
import { SMSBody } from '../../Models/SMSBody';
import { CurrencyPipe } from '@angular/common';
import { GlobalVarService } from '../../services/global-var.service';
import { Group } from '../../Models/Group';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { SlipTransactionBody } from '../../Models/SlipTransactionBody';

@Component({
  selector: 'app-create-slip',
  templateUrl: './create-slip.component.html',
  styleUrls: ['./create-slip.component.css']
})
export class CreateSlipComponent {
  homeCurrency:string = "INR"
  slip:SlipTransactionVM[] = []
  maxDate:Date = new Date()
  isLoading:boolean = false
  createform = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    amount: [0, [Validators.required, Validators.min(2)]],
    paidByUserId: ["", [Validators.required, Validators.min(1)]],
    TransactionDate: [new Date(), Validators.required],
    Users: [[], [Validators.required]]
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Group,
    public dialogRef: MatDialogRef<CreateSlipComponent>,
    private sliptransactionService: SliptransactionsService,
    private globalVar: GlobalVarService,
    private snackBar: MatSnackBar,
    private emailService: EmailService,
    private currency: CurrencyPipe,
    private formBuilder: FormBuilder
  ){}

  async ngOnInit(){
    this.isLoading = true
    this.globalVar.checkToken()
    await this.getslippayment()
  }

  checkPayerandSplitIsSame(payer:string, split:string){
    if(payer == split){
      return false
    }else{
      return true
    }
  }

  createnewspliptransaction(){
    var newUsers:string[] = this.createform.controls['Users'].value
    if(this.createform.valid){
      if(newUsers.length == 1 ? this.createform.controls['paidByUserId'].value != newUsers[0] : true){
        this.isLoading = true
        var Slip:AddSlip = {
          type: "Payment",
          name: this.createform.controls['name'].value,
          amount: this.createform.controls['amount'].value,
          paidUser_id: this.createform.controls['paidByUserId'].value,
          addedBy_id: this.globalVar.user.id,
          group_id: this.data._id,
          split_between: this.createform.controls['Users'].value,
          payment_date: this.createform.controls['TransactionDate'].value,
          created_on: new Date(),
          updated_on: new Date(),
        }
        this.sliptransactionService.Addslipayment(Slip).subscribe((res) => {
          if(!res.err){
            this.isLoading = false
            this.dialogRef.close(true);
            this.snackBar.openFromComponent(SnackbarComponent, {
              data: {
                message: "The Transaction is Splitted Successfully",
                status: "success"
              },
              panelClass: ['success-sb']
            });
            this.sendEmail(Slip)
          }else{
            this.isLoading = false
            this.snackBar.openFromComponent(SnackbarComponent, {
              data: {
                message: "We are facing some issue creating the Transaction",
                status: "success"
              },
              panelClass: ['success-sb']
            });
          }
        }, error => {
          this.snackBar.openFromComponent(SnackbarComponent, {
            data: {
              message: error.error.title,
              status: "error"
            },
            panelClass: ['error-sb']
          });
        })
      }else{
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: "Paid and Split User can not be same",
            status: "info"
          },
          panelClass: ['info-sb']
        });
      }
    }else{
      this.createform.markAllAsTouched()
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: {
          message: "Please Enter Valid Data",
          status: "info"
        },
        panelClass: ['info-sb']
      });
    }
  }

  sendEmail(slip:AddSlip){
    slip.split_between.forEach((member:string) => {
      var user = this.data.members.filter(user => user._id == member)[0]
      var slipOwner = this.data.members.filter(user => user._id == slip.paidUser_id)[0]
      var own = slip.amount / slip.split_between.length
      var email:EmailBody = {
        user: member,
        subject: "Split Generated by " + (this.globalVar.user.id == user._id ? "You" : this.globalVar.user.name) + " of " + this.currency.transform(slip.amount, this.homeCurrency) + " for " + slip.name,
        // body: ""
        body: `Hi <b>${user.name}</b>,
        <br><br>
        A Split Generated of <b> ${this.currency.transform(slip.amount, this.homeCurrency)} </b> as <b>'${slip.name}'</b>.
        <br><br>
        Payment Made by <b>${slipOwner.name}</b>
        <br>
        You Own <b>${this.currency.transform(own, this.homeCurrency)}</b> ${slip.paidUser_id == user._id ? "" : "to <b>"+ slipOwner.name +"</b>"}
        ${slip.paidUser_id == user._id ? "" : "<br>Your Current Balance is <b>" + this.currency.transform(this.calculatesingledebt(slip.paidUser_id, user._id) - own, this.homeCurrency) + "</b>"}
        <br><br>
        <b>
        Best Regards
        <br>
        Pay Your Share
        </b>`
      }

      this.emailService.sendEmail(email).subscribe((res:EmailResponse) => {
        if(!res.err){

        }
      })
    })
  }

  sendSMS(owner:Users, UId:string, amount:number, reason:string, own:number){
    var sms:SMSBody = {
      ToUId: UId,
      Body: `${owner.name} created a split with you of Amount ${this.currency.transform(amount, this.homeCurrency)} as '${reason}'. You Own ${this.currency.transform(own, this.homeCurrency)}.`
    }
    this.emailService.sendSMS(sms).subscribe((res)=>{

    })
  }

  async getslippayment(){
    this.isLoading = true
    var transaction:SlipTransactionBody = {
      group: this.data._id,
      type: "Payment"
    }
    await this.sliptransactionService.getslipayment(transaction).subscribe((res:SlipResponse)=>{
      this.isLoading = false
      this.slip = res.data.transaction
    })
  }

  calculatesingledebt(from:string, to:string){
    var paidbyfrom:any = 0
    var paidbyto:any = 0
    this.slip.forEach((ele:SlipTransactionVM) => {
      if(ele.paidUser_id._id == from && ele.split_between.some((user) => user._id.toString().includes(to.toString()))){
        paidbyfrom = paidbyfrom + (ele.amount/ele.split_between.length)
      }
      if(ele.paidUser_id._id == to && ele.split_between.some((user) => user._id.toString().includes(from.toString()))){
        paidbyto = paidbyto + (ele.amount/ele.split_between.length)
      }
    });
    return Math.round(paidbyto - paidbyfrom)
  }

}
