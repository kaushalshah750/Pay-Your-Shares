import { Component } from '@angular/core';
import { SliptransactionsService } from '../../services/sliptransactions.service';
import { Users } from '../../Models/Users';
import { SlipTransactionVM } from '../../Models/SlipTransactionVM';
import { AuthServiceService } from '../../services/auth-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalVarService } from '../../services/global-var.service';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../../services/group.service';
import { Group } from '../../Models/Group';

@Component({
  selector: 'app-payment-summary',
  templateUrl: './payment-summary.component.html',
  styleUrls: ['./payment-summary.component.css']
})
export class PaymentSummaryComponent {
  userslist:Users[] = []
  slip:SlipTransactionVM[] = []
  group_Uid = this.route.snapshot.paramMap.get('groupid')!
  groupInfo:Group = {
    id: 0,
    name: "",
    description: "",
    admin: {
      id: 0,
      name: "",
      email: "",
      phone: "",
      picture: "",
      uId: ""
    },
    members: [],
    created_on: "",
    updated_on: "",
    uId: ""
  }

  constructor(
    private slipTransactionService: SliptransactionsService,
    private authService: AuthServiceService,
    private spinner: NgxSpinnerService,
    public globalVar: GlobalVarService,
    private groupService: GroupService,
    private route: ActivatedRoute,
  ){}

  async ngOnInit(){
    this.spinner.show()
    this.globalVar.createUser()
    this.globalVar.checkToken()
    await this.getslippayment()
    this.getGroupDetail()
    await this.getotheruserlist()
    // await this.getuser()
  }

  // async getuser(){
  //   this.spinner.show()
  //   await this.slipTransactionService.getuser().subscribe((res:Users)=>{
  //     this.loggedinuser = res
  //     this.spinner.hide()
  //   })
  // }

  async getotheruserlist(){
    this.spinner.show()
    await this.groupService.getUserInfoByGroup(this.group_Uid).subscribe((res:Users[])=>{
      this.userslist = res
      this.spinner.hide()
    })
  }

  async getslippayment(){
    this.spinner.show()
    
    await this.slipTransactionService.getslipayment(this.group_Uid).subscribe((res:SlipTransactionVM[])=>{
      this.slip = res
      this.spinner.hide()
    })
  }

  getGroupDetail(){
    this.groupService.getGroupByGroupId(this.group_Uid).subscribe((res:Group)=>{
      this.groupInfo = res
    })
  }

  // calculatetotaldebt(from:number){
  //   var paidbyfrom:any = 0
  //   var paidbyto:any = 0
  //   this.slip.forEach((ele:SlipTransactionVM) => {
  //     if(ele.paid_By.id == from){
  //       paidbyfrom = paidbyfrom + (ele.amount/ele.users.length)
  //     }
  //     if(ele.users.some((user) => user.id.toString().includes(from.toString()))){
  //       paidbyto = paidbyto + (ele.amount/ele.users.length)
  //     }
  //   });
  //   return Math.round(paidbyto - paidbyfrom)
  // }

  
  calculatesingledebt(from:string, to:string){
    var paidbyfrom:any = 0
    var paidbyto:any = 0
    this.slip.forEach((ele:SlipTransactionVM) => {
      if(ele.paid_By.uId == from && ele.users.some((user) => user.uId == to)){
        paidbyfrom = paidbyfrom + (ele.amount/ele.users.length)
      }
      if(ele.paid_By.uId == to && ele.users.some((user) => user.uId == from)){
        paidbyto = paidbyto + (ele.amount/ele.users.length)
      }
    });
    return Math.round(paidbyto - paidbyfrom)
  }

}
