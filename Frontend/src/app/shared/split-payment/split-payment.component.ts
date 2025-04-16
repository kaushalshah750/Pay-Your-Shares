import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalVarService } from '../services/global-var.service';

@Component({
  selector: 'app-split-payment',
  templateUrl: './split-payment.component.html',
  styleUrls: ['./split-payment.component.css'],
  standalone: false,
})
export class SplitPaymentComponent {
  isLoading: boolean = false
  constructor(
    public globalVar: GlobalVarService,
    public dialog: MatDialog,
  ) { }

}
