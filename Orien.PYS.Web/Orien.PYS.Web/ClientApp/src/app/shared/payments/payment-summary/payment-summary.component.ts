import { Component } from '@angular/core';
import { SliptransactionsService } from '../../services/sliptransactions.service';
import { Users } from '../../Models/Users';
import { SlipTransactionVM } from '../../Models/SlipTransactionVM';
import { AuthServiceService } from '../../services/auth-service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-payment-summary',
  templateUrl: './payment-summary.component.html',
  styleUrls: ['./payment-summary.component.css']
})
export class PaymentSummaryComponent {
  userslist:Users[] = []
  slip:SlipTransactionVM[] = []
  loggedinuser:Users = {
    id: 0,
    name: "",
    email: ""
  }

  constructor(
    private slipTransactionService: SliptransactionsService,
    private authService: AuthServiceService,
    private spinner: NgxSpinnerService
  ){}

  async ngOnInit(){
    this.spinner.show()
    await this.getotheruserlist()
    await this.getuser()
    await this.getslippayment()
  }
  
  async getuser(){
    this.spinner.show()
    await this.slipTransactionService.getuser(this.authService.getclaims(this.authService.getAccessToken()).oid).subscribe((res:Users)=>{
      this.loggedinuser = res
      this.spinner.hide()
    })
  }

  async getotheruserlist(){
    this.spinner.show()
    await this.slipTransactionService.getotheruserlist().subscribe((res:Users[])=>{
      this.userslist = res
      this.spinner.hide()
    })
  }

  async getslippayment(){
    this.spinner.show()
    await this.slipTransactionService.getslipayment().subscribe((res:SlipTransactionVM[])=>{
      this.slip = res
      this.spinner.hide()
    })
  }

  calculatetotaldebt(from:number){
    var paidbyfrom:any = 0
    var paidbyto:any = 0
    this.slip.forEach((ele:SlipTransactionVM) => {
      if(ele.paid_By.id == from){
        paidbyfrom = paidbyfrom + (ele.amount/ele.users.length)
      }
      if(ele.users.some((user) => user.id.toString().includes(from.toString()))){
        paidbyto = paidbyto + (ele.amount/ele.users.length)
      }
    });
    return Math.round(paidbyto - paidbyfrom)
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

}
