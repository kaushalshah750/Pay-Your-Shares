import { Component, ViewChild } from '@angular/core';
import { SlipTransactionVM, SlipResponse } from '../../Models/SlipTransactionVM';
import { SliptransactionsService } from '../../services/sliptransactions.service';
import { GlobalVarService } from '../../services/global-var.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Users } from '../../Models/Users';
import { ActivatedRoute } from '@angular/router';
import { Group } from '../../Models/Group';
import { CreateSlipComponent } from '../../Dialog/create-slip/create-slip.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationComponent } from '../../Dialog/confirmation/confirmation.component';
import { SlipTransactionBody } from '../../Models/SlipTransactionBody';
import { AuthUser } from '../../Models/AuthUser';
import { SnackbarService } from '../../services/snackbar.service';

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
    public globalVarService: GlobalVarService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private snackbarService: SnackbarService,
  ){
    this.globalVarService.checkToken()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  async ngOnInit(){
    this.isLoading = true
    this.globalVarService.createUser()
    this.user = this.globalVarService.user
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
    }, (error) => {
      if (error.status == 401){
        this.globalVarService.getRefreshToken(this.globalVarService.getRefreshAccessToken()!).subscribe((res:AuthUser) => {
          if(res.id_token){
            localStorage.setItem(this.globalVarService.accessTokenKey, res.id_token)
            this.getslippayment()
          }
        })
      }
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
            this.snackbarService.openSuccessSnackbar("The Slip is Successfully deleted")
            this.getslippayment()
          }else{
            this.snackbarService.openErrorSnackbar("The Slip Failed to Delete.")
          }
        }, (error) => {
          if (error.status == 401){
            this.globalVarService.getRefreshToken(this.globalVarService.getRefreshAccessToken()!).subscribe((res:AuthUser) => {
              if(res.id_token){
                localStorage.setItem(this.globalVarService.accessTokenKey, res.id_token)
                this.deletesliptransaction(slip)
              }
            })
          }
        })
      }
    })

  }

}
