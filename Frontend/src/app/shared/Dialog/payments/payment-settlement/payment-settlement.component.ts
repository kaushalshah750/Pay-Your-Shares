import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { formatCurrency } from '@angular/common';
import { Group } from 'src/app/shared/Models/Group';
import { GroupSummary } from 'src/app/shared/Models/GroupSummary';
import { TransactionSettlement } from 'src/app/shared/Models/TransactionSettlement';
import { TransactionSettlementService } from 'src/app/shared/services/transaction-settlement.service';
import { SnackbarComponent } from '../../snackbar/snackbar.component';

@Component({
  selector: 'app-payment-settlement',
  templateUrl: './payment-settlement.component.html',
  styleUrls: ['./payment-settlement.component.css']
})
export class PaymentSettlementComponent {
  isLoading:boolean = false
  createform = this.formBuilder.nonNullable.group({
    amount: [0, [Validators.required]],
  })
  user:GroupSummary = this.data.settleUser
  group:Group = this.data.group
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PaymentSettlementComponent>,
    private transactionSettlementService: TransactionSettlementService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ){}
  
  createTransactionSettlement(){
    if(this.createform.valid){
      var settlement:TransactionSettlement = {
        Action: this.user.balance > 0 ? "Me" : "You",
        Amount: this.createform.controls['amount'].value,
        SettleBy_id: this.user.user,
        SettleTo_id: this.user.user,
        AddedBy_id: this.user.user,
        Group_id: this.group,
        Payment_date: new Date(),
      }
      
      this.transactionSettlementService.addTransactionSettlement(settlement).subscribe((res) => {
        this.dialogRef.close(true);
      })
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: {
          message: formatCurrency(this.createform.controls['amount'].value, 'en-US', '₹', 'INR', '1.2-2') + " is Settled Successfully",
          status: "success"
        },
        panelClass: ['success-sb']
      });
    }else{
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: {
          message: "Please Enter a Valid Amount to Settle",
          status: "error"
        },
        panelClass: ['error-sb']
      });
    }
  }

}
