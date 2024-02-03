import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SliptransactionsService } from '../../services/sliptransactions.service';
import { Users } from '../../Models/Users';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../../services/auth-service.service';
import { AddSlip } from '../../Models/AddSlip';
import { FormBuilder, Validators } from '@angular/forms';
import { EmailBody } from '../../Models/EmailBody';
import { EmailService } from '../../services/email.service';
import { SlipTransactionVM } from '../../Models/SlipTransactionVM';
import { SMSBody } from '../../Models/SMSBody';
import { CurrencyPipe } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-slip',
  templateUrl: './create-slip.component.html',
  styleUrls: ['./create-slip.component.css']
})
export class CreateSlipComponent {
  homeCurrency:string = "INR"
  users:Users[] = []
  userlist:number[] = []
  slip:SlipTransactionVM[] = []

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
    private emailService: EmailService,
    private currency: CurrencyPipe,
    private formBuilder: FormBuilder
  ){}

  async ngOnInit(){
    console.log(this.currency.transform(100,'INR'))
    await this.getuserslist()
    await this.getslippayment()
  }

  async getuserslist(){
    this.spinner.show()

    await this.sliptransactionService.getuserlist().subscribe((res:Users[]) => {
      this.users = res
      console.log(this.users.find(u => u.UId == "8677e173-0815-4bf6-b631-3529dc9bdb5e"))
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
      this.sendEmail(Slip)
      this.spinner.show()
      this.sliptransactionService.Addslipayment(Slip).subscribe(() => {
        this.userlist = []
        this.dialogRef.close(true);
      })
    }else{
      this.toastr.info('The info is not correct', 'Success')
    }
  }

  getUserDataById(id:number): Users{
    return this.users.find(u => u.id == id)!
  }

  getUserDataByAzureId(AzureId:string): Users{
    return this.users.find(u => u.UId == AzureId)!
  }

  sendEmail(slip:AddSlip){
    var owner:Users = this.getUserDataByAzureId(slip.AzureId!)    
    var own = slip.Amount / slip.Users.length
    
    slip.Users.forEach((element:number) => {
      // if(this.getUserDataById(element).azureID != owner.azureID){
        var splitUser:Users = this.getUserDataById(element)!

        var body = `Hi <b>${splitUser.name}</b>,
        <br><br>
        A Split Generated of <b> ${this.currency.transform(slip.Amount, this.homeCurrency)} </b> as <b>'${slip.Name}'</b>.
        <br><br>
        You Own <b>${this.currency.transform(own, this.homeCurrency)}</b>
        <br>
        Your Current Balance is <b>${this.currency.transform(this.calculatesingledebt(owner.id, splitUser.id) - own, this.homeCurrency)}</b>
        <br><br>
        <b>
        Best Regards
        <br>
        Pay Your Share
        </b>`;

        var emailBody:EmailBody = {
          UId: splitUser.UId,
          Subject: "Split Generated by " + owner.name + " of " + this.currency.transform(slip.Amount, this.homeCurrency) + " for " + slip.Name,
          Body: body,
          isHtml: true
        }
        this.emailService.sendEmail(emailBody).subscribe((res:boolean) => {
          if(environment.sendSMS){
            this.sendSMS(owner, splitUser.UId, slip.Amount, slip.Name, own);
          }
        })
      // }
    });
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
    this.spinner.show()
    await this.sliptransactionService.getslipayment().subscribe((res:SlipTransactionVM[])=>{
      this.slip = res
      this.spinner.hide()
      console.log(this.calculatesingledebt(1,2))
    })
  }

  calculatesingledebt(from:number, to:number){
    var paidbyfrom:any = 0
    var paidbyto:any = 0
    this.slip.forEach((ele:SlipTransactionVM) => {
      if(ele.paid_By.id == from && ele.users.some((user) => user.id.toString().includes(to.toString()))){
        paidbyfrom = paidbyfrom + (ele.amount/ele.users.length)
      }
      if(ele.paid_By.id == to && ele.users.some((user) => user.id.toString().includes(from.toString()))){
        paidbyto = paidbyto + (ele.amount/ele.users.length)
      }
    });
    return Math.round(paidbyto - paidbyfrom)
  }


  clearfields(){
    this.createform.controls.name.setValue('')
    this.createform.controls.amount.setValue(0)
    this.createform.controls.paidByUserId.setValue(0)
    // this.createform.controls.Users.setValue()
    this.userlist = []
  }


}
