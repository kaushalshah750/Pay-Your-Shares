import { Component } from '@angular/core';
import { GlobalVarService } from '../../services/global-var.service';
import { ActivatedRoute } from '@angular/router';
import { Group } from '../../Models/Group';
import { UserService } from '../../services/user.service';
import { GroupSummary, GroupSummaryResponse} from '../../Models/GroupSummary';
import { MatTableDataSource } from '@angular/material/table';
import { SlipTransactionBody } from '../../Models/SlipTransactionBody';
import { TransactionSettlementService } from '../../services/transaction-settlement.service';
import { TransactionSettlement, TransactionSettlementResponse } from '../../Models/TransactionSettlement';
import { MatDialog } from '@angular/material/dialog';
import { CreateSlipComponent } from '../../Dialog/create-slip/create-slip.component';
import { PaymentSettlementComponent } from '../../Dialog/payments/payment-settlement/payment-settlement.component';

@Component({
  selector: 'app-payment-summary',
  templateUrl: './payment-summary.component.html',
  styleUrls: ['./payment-summary.component.css']
})

export class PaymentSummaryComponent {
  slip:TransactionSettlement[] = []
  displayedColumns: string[] = ['Amount', 'Settle By', 'Settle To', 'Transaction Date'];
  dataSource = new MatTableDataSource<TransactionSettlement>(this.slip);
  isLoading:boolean = false
  groupSummary:GroupSummary[] = []
  group_Uid = this.route.snapshot.paramMap.get('groupid')!
  groupInfo:Group = {
    _id: "",
    name: "",
    description: "",
    admin: {
      _id: "",
      name: "",
      email: "",
      phone: 0,
      picture: "",
      last_login: "",
      uid: ""
    },
    members: [],
    created_on: "",
    updated_on: "",
    uId: ""
  }

  constructor(
    private transactionSettlementService: TransactionSettlementService,
    public globalVar: GlobalVarService,
    private userService: UserService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ){}

  async ngOnInit(){
    // if(this.group_Uid){
    //   await this.getGroupDetail()
    // }
    this.isLoading = true
    this.globalVar.checkToken()
    await this.getGroupSummary()
    await this.getslippayment()
  }

  async getslippayment(){
    this.isLoading = true
    var transaction: SlipTransactionBody = {
      group: this.group_Uid,
      type: "Settlement"
    }
    await this.transactionSettlementService.getTransactionSettlement(transaction).subscribe((res:TransactionSettlementResponse)=>{
      this.isLoading = false
      this.slip = res.data.transaction
      this.groupInfo = res.data.group
      this.dataSource.data = this.slip;
    })
  }

  settlePayment(user:GroupSummary){
    const dialogRef = this.dialog.open(PaymentSettlementComponent, {
        data: {
          settleUser: user,
          group: this.groupInfo
        },
        width: '400px'
      } 
    );

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getslippayment()
        this.getGroupSummary()
      }
    });
  }

  async getGroupSummary(){
    this.isLoading = true
    await this.userService.getGroupSummary(this.group_Uid).subscribe((res:GroupSummaryResponse)=>{
      this.isLoading = false
      this.groupSummary = res.data
    })
  }

  // async getGroupDetail(){
  //   this.isLoading = true
  //   await this.groupService.getGroupByGroupId(this.group_Uid).subscribe((res:GroupResponseOne)=>{
  //     this.isLoading = false
  //     this.groupInfo = res.data
  //   })
  // }
}