import { Component, ViewChild } from '@angular/core';
import { SlipTransactionVM } from '../../Models/SlipTransactionVM';
import { SliptransactionsService } from '../../services/sliptransactions.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalVarService } from '../../services/global-var.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Users } from '../../Models/Users';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../../services/group.service';
import { Group } from '../../Models/Group';
import { CreateSlipComponent } from '../../Dialog/create-slip/create-slip.component';

@Component({
  selector: 'app-payment-slip',
  templateUrl: './payment-slip.component.html',
  styleUrls: ['./payment-slip.component.css']
})
export class PaymentSlipComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  slip:SlipTransactionVM[] = []
  user:any = ""
  users:Users[] = []
  userlist:number[] = []
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

  displayedColumns: string[] = ['Name', 'Paid By', 'Amount', 'Transaction Date', 'Split In', 'Action'];
  dataSource = new MatTableDataSource<SlipTransactionVM>(this.slip);

  constructor(
    private sliptransactionService: SliptransactionsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public globalVar: GlobalVarService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private groupService: GroupService,
  ){
    this.globalVar.checkToken()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  async ngOnInit(){
    this.spinner.show()
    this.user = this.globalVar.user
    this.getGroupDetail()
    this.spinner.show()
    await this.getuserslist()
    this.spinner.show()
    await this.getslippayment()
  }
  
  async getuserslist(){
    await this.sliptransactionService.getuserlist().subscribe((res:Users[]) => {
      this.users = res
      this.spinner.hide()
    })
  }

  getGroupDetail(){
    this.groupService.getGroupByGroupId(this.group_Uid).subscribe((res:Group)=>{
      this.groupInfo = res
    })
  }
  
  async getslippayment(){
    await this.sliptransactionService.getslipayment(this.group_Uid).subscribe((res:SlipTransactionVM[])=>{
      this.slip = res
      this.spinner.hide()
      this.dataSource.data = this.slip;
    })
  }

  addslip(){
    const dialogRef = this.dialog.open(CreateSlipComponent, {
        data: this.group_Uid,
        width: '400px'
      } 
    );

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getslippayment()
      }else{
        this.spinner.hide()
      }
    });
  }

  refresh(){
    this.spinner.show()
    this.slip = []
    this.getslippayment()
  }

  deletesliptransaction(slip:SlipTransactionVM){
    this.spinner.show()
    this.sliptransactionService.deleteslipayment(slip.slip_Id).subscribe((res:boolean)=>{
      this.spinner.show()
      if(res){
        this.toastr.success('The Slip is Successfully deleted', 'Success')
        this.getslippayment()
      }else{
        this.toastr.error('The Slip Failed to delete', 'Error')
        this.spinner.hide()
      }
    })
  }

}
