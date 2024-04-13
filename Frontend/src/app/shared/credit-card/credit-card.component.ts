import { Component } from '@angular/core';
import { CreditCard } from '../Models/CreditCard';
import { CreditCardService } from '../services/credit-card.service';
import { CreditCardStatement } from '../Models/CreditCardStatement';
import { CreditCardSummary } from '../Models/CreditCardSummary';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent {
  creditcardlist:CreditCardSummary[] = []
  creditcardstatlist:CreditCardStatement[] = []

  constructor(private creditcardService: CreditCardService){}

  ngOnInit(){
    this.getcreditcardlist()
    this.getcreditcardstatementlist()
  }

  totalamount(){
    let totalamount:number = 0

    this.creditcardstatlist.forEach((res:CreditCardStatement) => {
      totalamount = totalamount + res.amount
    })

    return totalamount;
  }

  getcreditcardlist(){
    this.creditcardService.getcreditcardlist().subscribe((res:CreditCardSummary[]) => {
      this.creditcardlist = res
    })
  }

  getcreditcardstatementlist(){
    this.creditcardService.getcreditcardstatementlist().subscribe((res:CreditCardStatement[]) => {
      this.creditcardstatlist = res
    })
  }
}
