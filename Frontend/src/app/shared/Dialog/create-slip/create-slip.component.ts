import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SliptransactionsService } from '../../services/sliptransactions.service';
import { Users } from '../../Models/Users';
import { AddSlip } from '../../Models/AddSlip';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { EmailBody, EmailResponse } from '../../Models/EmailBody';
import { EmailService } from '../../services/email.service';
import { SlipResponse, SlipTransactionVM } from '../../Models/SlipTransactionVM';
import { SMSBody } from '../../Models/SMSBody';
import { CurrencyPipe } from '@angular/common';
import { GlobalVarService } from '../../services/global-var.service';
import { Group } from '../../Models/Group';
import { SlipTransactionBody } from '../../Models/SlipTransactionBody';
import { AuthUser } from '../../Models/AuthUser';
import { DatePipe } from '@angular/common';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-create-slip',
  templateUrl: './create-slip.component.html',
  styleUrls: ['./create-slip.component.css'],
  standalone: false,
})
export class CreateSlipComponent {
  homeCurrency: string = "INR"
  slip: SlipTransactionVM[] = []
  maxDate: Date = new Date()
  isLoading: boolean = false
  createform = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    amount: [0, [Validators.required, Validators.min(2)]],
    paidByUserId: [0, [Validators.required, Validators.min(1)]],
    TransactionDate: [this.datePipe.transform(new Date(Date.now()), 'yyyy-MM-dd'), Validators.required],
    Users: this.formBuilder.array([], Validators.required)
  })
  userList: FormArray = this.formBuilder.array([])

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Group,
    public dialogRef: MatDialogRef<CreateSlipComponent>,
    private sliptransactionService: SliptransactionsService,
    private globalVarService: GlobalVarService,
    private snackBarService: SnackbarService,
    private datePipe: DatePipe,
    private emailService: EmailService,
    private currency: CurrencyPipe,
    private formBuilder: FormBuilder
  ) { }

  async ngOnInit() {
    this.isLoading = true
    // this.globalVarService.checkToken()
    await this.getslippayment()
  }

  checkPayerandSplitIsSame(payer: string, split: string) {
    if (payer == split) {
      return false
    } else {
      return true
    }
  }

  get usersFormArray(): FormArray {
    return this.createform.get('Users') as FormArray;
  }

  onCheckboxChange(event: any) {
    this.userList = this.usersFormArray;

    if (event.target.checked) {
      this.userList.push(new FormControl(+event.target.value));
    } else {
      const index = this.userList.controls.findIndex(x => x.value === +event.target.value);
      if (index !== -1) {
        this.userList.removeAt(index);
      }
    }
  }

  createnewspliptransaction() {
    // var newUsers: number[] = this.createform.controls['Users'].value
    console.log(this.userList.value)
    console.log("createnewspliptransaction")
    console.log(this.createform)
    console.log(this.createform.value)
    console.log(this.createform.valid)
    if (this.createform.valid) {
      const newUsers = this.createform.controls['Users'].value;
      if (newUsers.length == 1 ? this.createform.controls['paidByUserId'].value != newUsers[0] : true) {
        this.isLoading = true
        var Slip: AddSlip = {
          Name: this.createform.controls['name'].value,
          Amount: this.createform.controls['amount'].value,
          PaidBy_id: this.createform.controls['paidByUserId'].value,
          AddedBy_id: this.globalVarService.user.User_id,
          Group_id: this.data.Group_id,
          Split_between: newUsers.map(Number),
          Payment_date: this.createform.controls['TransactionDate'].value!,
        }
        this.sliptransactionService.Addslipayment(Slip).subscribe((res) => {
          if (!res.err) {
            this.isLoading = false
            this.dialogRef.close(true);
            this.snackBarService.openSuccessSnackbar("The Transaction is Splitted Successfully")
            this.sendEmail(Slip)
          } else {
            this.isLoading = false
            this.snackBarService.openErrorSnackbar("We are facing some issue creating the Transaction")
          }
        }, (error) => {
          if (error.status == 401) {
            this.globalVarService.getRefreshToken(this.globalVarService.getRefreshAccessToken()!).subscribe((res: AuthUser) => {
              if (res.id_token) {
                localStorage.setItem(this.globalVarService.accessTokenKey, res.id_token)
                this.createnewspliptransaction()
              }
            })
          }
        })
      } else {
        this.snackBarService.openInfoSnackbar("Paid and Split User can not be same")
      }
    } else {
      this.createform.markAllAsTouched()
      this.snackBarService.openInfoSnackbar("Please Enter Valid Data")
    }
  }

  sendEmail(slip: AddSlip) {
    slip.Split_between.forEach((member: number) => {
      var user = this.data.Members.filter(user => user.User_id == member)[0]
      var slipOwner = this.data.Members.filter(user => user.User_id == slip.PaidBy_id)[0]
      var own = slip.Amount / slip.Split_between.length
      var email: EmailBody = {
        User: member,
        Subject: "Split Generated by " + (this.globalVarService.user.User_id == user.User_id ? "You" : this.globalVarService.user.Name) + " of " + this.currency.transform(slip.Amount, this.homeCurrency) + " for " + slip.Name,
        Body: `Hi <b>${user.Name}</b>,
        <br><br>
        A Split Generated of <b> ${this.currency.transform(slip.Amount, this.homeCurrency)} </b> as <b>'${slip.Name}'</b>.
        <br><br>
        Payment Made by <b>${slipOwner.Name}</b>
        <br>
        You Own <b>${this.currency.transform(own, this.homeCurrency)}</b> ${slip.PaidBy_id == user.User_id ? "" : "to <b>" + slipOwner.Name + "</b>"}
        ${slip.PaidBy_id == user.User_id ? "" : "<br>Your Current Balance is <b>" + this.currency.transform(this.calculatesingledebt(slip.PaidBy_id, user.User_id) - own, this.homeCurrency) + "</b>"}
        <br><br>
        <b>
        Best Regards
        <br>
        Pay Your Share
        </b>`
      }

      this.emailService.sendEmail(email).subscribe((res: EmailResponse) => {
        if (!res.err) {

        }
      }, (error) => {
        if (error.status == 401) {
          this.globalVarService.getRefreshToken(this.globalVarService.getRefreshAccessToken()!).subscribe((res: AuthUser) => {
            if (res.id_token) {
              localStorage.setItem(this.globalVarService.accessTokenKey, res.id_token)
              this.sendEmail(slip)
            }
          })
        }
      })
    })
  }

  sendSMS(owner: Users, UId: string, amount: number, reason: string, own: number) {
    var sms: SMSBody = {
      ToUId: UId,
      Body: `${owner.Name} created a split with you of Amount ${this.currency.transform(amount, this.homeCurrency)} as '${reason}'. You Own ${this.currency.transform(own, this.homeCurrency)}.`
    }
    this.emailService.sendSMS(sms).subscribe((res) => {

    }, (error) => {
      if (error.status == 401) {
        this.globalVarService.getRefreshToken(this.globalVarService.getRefreshAccessToken()!).subscribe((res: AuthUser) => {
          if (res.id_token) {
            localStorage.setItem(this.globalVarService.accessTokenKey, res.id_token)
            this.sendSMS(owner, UId, amount, reason, own)
          }
        })
      }
    })
  }

  async getslippayment() {
    this.isLoading = true
    var transaction: SlipTransactionBody = {
      group: this.data.Group_id
    }
    await this.sliptransactionService.getslipayment(transaction).subscribe((res: SlipResponse) => {
      this.isLoading = false
      this.slip = res.data.Transaction
    }, (error) => {
      if (error.status == 401) {
        this.globalVarService.getRefreshToken(this.globalVarService.getRefreshAccessToken()!).subscribe((res: AuthUser) => {
          if (res.id_token) {
            localStorage.setItem(this.globalVarService.accessTokenKey, res.id_token)
            this.getslippayment()
          }
        })
      }
    })
  }

  calculatesingledebt(from: number, to: number) {
    var paidbyfrom: any = 0
    var paidbyto: any = 0
    this.slip.forEach((ele: SlipTransactionVM) => {
      if (ele.PaidBy_id.User_id == from && ele.Split_between.some((user) => user.User_id.toString().includes(to.toString()))) {
        paidbyfrom = paidbyfrom + (ele.Amount / ele.Split_between.length)
      }
      if (ele.PaidBy_id.User_id == to && ele.Split_between.some((user) => user.User_id.toString().includes(from.toString()))) {
        paidbyto = paidbyto + (ele.Amount / ele.Split_between.length)
      }
    });
    return Math.round(paidbyto - paidbyfrom)
  }

}
