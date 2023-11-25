import { Component } from '@angular/core';
import { SliptransactionsService } from '../shared/services/sliptransactions.service';
import { AddSlip } from '../shared/Models/AddSlip';
import { Users } from '../shared/Models/Users';
import { SlipTransactionVM } from '../shared/Models/SlipTransactionVM';
import { formatDate } from '@angular/common';
import { AuthServiceService } from '../shared/services/auth-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  slip:SlipTransactionVM[] = []
  name:any = ""
  amount:number = 0
  paidByUserId:number = 0
  TransactionDate:any = new Date()
  users:Users[] = []
  userlist:number[] = []
  showaddslip:boolean = false
  userdebtcalc:Users[] = []

  constructor(
    private sliptransactionService: SliptransactionsService,
    private authservice: AuthServiceService,
  ){}

  async ngOnInit(){
    this.TransactionDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    console.log(this.TransactionDate)
    await this.getslippayment()
    await this.getuserslist()
    console.log(this.users)

    console.log(this.authservice.getclaims(this.authservice.getAccessToken()))
}
  
  async getuserslist(){
    await this.sliptransactionService.getuserlist().subscribe((res:Users[]) => {
      this.users = res
      // this.userdebtcalc = this.users
      // this.userdebtcalc.forEach((ele:any, index:number) =>{
      //   if(ele.id == 1){
      //     this.userdebtcalc.splice(index,1)
      //   }
      // })
    })
  }
  
  async getslippayment(){
    await this.sliptransactionService.getslipayment().subscribe((res:SlipTransactionVM[])=>{
      this.slip = res
    })
  }

  addslip(){
    this.showaddslip = !this.showaddslip
  }

  adduser(user:any){
    this.userlist.push(Number(user.target.value))
    console.log(this.userlist)
  }

  calculatetotaldebt(from:number, to:number){
    var paidbyfrom:any = 0
    var paidbyto:any = 0
    this.slip.forEach((ele:SlipTransactionVM) => {
      // console.log(ele)
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
    this.name = ""
    this.amount = 0
    this.paidByUserId = 0
    this.userlist = []
  }

  createnewsliptransaction(){
    var Slip:AddSlip = {
      Name: this.name,
      Amount: this.amount,
      PaidByUserId: Number(this.paidByUserId),
      TransactionDate: this.TransactionDate,
      Users: this.userlist
    }

    this.sliptransactionService.Addslipayment(Slip).subscribe(() => {
      this.getslippayment()
      this.userlist = []
      this.getuserslist()
    })
  }

  calculatetotal(from:string, to:string){

  }
}
