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
import { MatDialog } from '@angular/material/dialog';
import { CreateSlipComponent } from '../shared/Dialog/create-slip/create-slip.component';
import { CreateGroupComponent } from '../shared/Dialog/create-group/create-group.component';

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
  userdebtcalc:Users[] = []

  displayedColumns: string[] = ['Name', 'Paid By', 'Amount', 'Transaction Date', 'Split In'];
  dataSource = this.slip;

  constructor(
    private sliptransactionService: SliptransactionsService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog
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

  addgroup(){
    const dialogRef = this.dialog.open(CreateGroupComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getslippayment()
      }else{
        this.spinner.hide()
      }
    });
  }

  addslip(){
    const dialogRef = this.dialog.open(CreateSlipComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getslippayment()
      }else{
        this.spinner.hide()
      }
    });
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

  refresh(){
    this.spinner.show()

    this.slip = []
    this.getslippayment()
  }

  calculatetotal(from:string, to:string){

  }
}
