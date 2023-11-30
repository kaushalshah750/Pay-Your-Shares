import { Component } from '@angular/core';
import { SliptransactionsService } from '../shared/services/sliptransactions.service';
import { AddSlip } from '../shared/Models/AddSlip';
import { Users } from '../shared/Models/Users';
import { SlipTransactionVM } from '../shared/Models/SlipTransactionVM';
import { DatePipe, formatDate } from '@angular/common';
import { AuthServiceService } from '../shared/services/auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl } from '@angular/forms';

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
  TransactionDate:any = new FormControl(new Date())
  users:Users[] = []
  userlist:number[] = []
  showaddslip:boolean = false
  userdebtcalc:Users[] = []

  displayedColumns: string[] = ['Name', 'Paid By', 'Amount', 'Transaction Date', 'Split In'];
  dataSource = this.slip;

  constructor(
    private sliptransactionService: SliptransactionsService,
    private authservice: AuthServiceService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe,

  ){}

  async ngOnInit(){
    this.spinner.show()
    // this.TransactionDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    await this.getuserslist()
    await this.getslippayment()
  }
  
  async getuserslist(){
    this.spinner.show()

    await this.sliptransactionService.getuserlist().subscribe((res:Users[]) => {
      this.users = res
      this.spinner.hide()
    })
  }
  
  async getslippayment(){
    this.spinner.show()

    await this.sliptransactionService.getslipayment().subscribe((res:SlipTransactionVM[])=>{
      this.slip = res
      this.spinner.hide()
      this.dataSource = this.slip;

    })
  }

  addslip(){
    this.showaddslip = !this.showaddslip
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

  calculatetotaldebt(from:number, to:number){
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
    this.name = ""
    this.amount = 0
    this.paidByUserId = 0
    this.userlist = []
  }

  refresh(){
    this.spinner.show()

    this.slip = []
    this.getslippayment()
  }

  createnewsliptransaction(){
    this.TransactionDate.value = this.datePipe.transform(this.TransactionDate.value, 'yyyy-MM-ddTHH:mm:ss', 'IST');

    console.log(this.TransactionDate.value)
    var Slip:AddSlip = {
      Name: this.name,
      Amount: this.amount,
      PaidByUserId: Number(this.paidByUserId),
      AzureId: this.authservice.getAzureID(),
      TransactionDate: this.TransactionDate.value,
      Users: this.userlist
    }
    if(Slip.Name != "" && Slip.Amount != 0 && Slip.AzureId != "" && Slip.PaidByUserId != 0 && this.userlist.length != 0){
      this.spinner.show()
      this.sliptransactionService.Addslipayment(Slip).subscribe(() => {
        this.getslippayment()
        this.userlist = []
        this.getuserslist()
      })
    }else{
      this.toastr.info('The info is not correct', 'Success')
    }
  }

  calculatetotal(from:string, to:string){

  }
}
