import { Component, ViewChild } from '@angular/core';
import { SlipTransactionVM, SlipResponse, SlipTransactionWithGroup } from '../../Models/SlipTransactionVM';
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
import { Group, GroupResponse, GroupResponseOne } from '../../Models/Group';
import { CreateSlipComponent } from '../../Dialog/create-slip/create-slip.component';
import { SnackbarComponent } from '../../Dialog/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationComponent } from '../../Dialog/confirmation/confirmation.component';
import { SlipTransactionBody } from '../../Models/SlipTransactionBody';

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
  group_Uid = Number(this.route.snapshot.paramMap.get('groupid')!)
  groupInfo:Group = {
    Group_id: 0,
    Name: "",
    Description: "",
    Admin: {
      User_id: 0,
      Name: "",
      Email: "",
      Phone: 0,
      Picture: ""
    },
    Members: [],
    Created_on: "",
    Updated_on: ""
  }
  isLoading:boolean = false
  displayedColumns: string[] = ['Name', 'Paid By', 'Amount', 'Transaction Date', 'Split In', 'Action'];
  dataSource = new MatTableDataSource<SlipTransactionVM>(this.slip);

  constructor(
    private sliptransactionService: SliptransactionsService,
    public globalVar: GlobalVarService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private groupService: GroupService,
    private snackBar: MatSnackBar,
  ){
    this.globalVar.checkToken()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  async ngOnInit(){
    this.isLoading = true
    this.globalVar.createUser()
    this.user = this.globalVar.user
    await this.getslippayment()
  }
    
  async getslippayment(){
    this.isLoading = true
    var transaction: SlipTransactionBody = {
      group: this.group_Uid
    }
    await this.sliptransactionService.getslipayment(transaction).subscribe((res:SlipResponse)=>{
      this.isLoading = false
      this.slip = res.data.Transaction
      this.groupInfo = res.data.Group
      this.dataSource.data = this.slip;
    })
  }

  addslip(){
    const dialogRef = this.dialog.open(CreateSlipComponent, {
        data: this.groupInfo,
        width: '400px'
      } 
    );

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getslippayment()
      }
    });
  }

  refresh(){
    this.slip = []
    this.getslippayment()
  }

  deletesliptransaction(slip:SlipTransactionVM){

    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        title: "Are you sure?",
        description: "Are you sure you want to Delete the Slip?",
        button: "Delete"
      },
      width: '400px'
    })

    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.isLoading = true
        this.sliptransactionService.deleteslipayment(slip.Slip_id).subscribe((res:SlipResponse)=>{
          this.isLoading = false
          if(!res.err){
            this.snackBar.openFromComponent(SnackbarComponent, {
              data: {
                message: "The Slip is Successfully deleted",
                status: "success"
              },
              panelClass: ['success-sb']
            });
            this.getslippayment()
          }else{
            this.snackBar.openFromComponent(SnackbarComponent, {
              data: {
                message: "The Slip Failed to delete",
                status: "error"
              },
              panelClass: ['error-sb']
            });
          }
        })
      }
    })

  }

}
