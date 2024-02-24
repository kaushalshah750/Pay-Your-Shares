import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { CreateGroupComponent } from '../Dialog/create-group/create-group.component';
import { CreateSlipComponent } from '../Dialog/create-slip/create-slip.component';
import { GlobalVarService } from '../services/global-var.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-split-payment',
  templateUrl: './split-payment.component.html',
  styleUrls: ['./split-payment.component.css']
})
export class SplitPaymentComponent {
  constructor(
    private spinner: NgxSpinnerService,
    public globalVar: GlobalVarService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ){
  }

  ngOnInit(){
    console.log(this.route.title)
  }


  // calculatetotaldebt(from:number, to:number){
  //   var paidbyfrom:any = 0
  //   var paidbyto:any = 0
  //   this.slip.forEach((ele:SlipTransactionVM) => {
  //     if(ele.paid_By.id == from && ele.users.some((user) => user.id.toString().includes(to.toString()))){
  //       paidbyfrom = paidbyfrom + (ele.amount/ele.users.length)
  //     }
  //     if(ele.paid_By.id == to && ele.users.some((user) => user.id.toString().includes(from.toString()))){
  //       paidbyto = paidbyto + (ele.amount/ele.users.length)
  //     }
  //   });
  //   return Math.round(paidbyto - paidbyfrom)
  // }

}
