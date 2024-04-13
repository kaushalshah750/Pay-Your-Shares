import { Injectable } from '@angular/core';
import { AuthapiService } from './authapi.service';
import { SlipTransactionBody } from '../Models/SlipTransactionBody';
import { TransactionSettlement, TransactionSettlementResponse } from '../Models/TransactionSettlement';

@Injectable({
  providedIn: 'root'
})
export class TransactionSettlementService {
  url = 'api/transaction-settlement'
  
  constructor(
    private authApiService: AuthapiService,
  ) { }

  getTransactionSettlement(slipTransaction:SlipTransactionBody){
    return this.authApiService.post<TransactionSettlementResponse>(this.url + "/get-transaction", slipTransaction);
  }

  addTransactionSettlement(transactionSettlement:TransactionSettlement){
    return this.authApiService.post<TransactionSettlementResponse>(this.url + "/settle", transactionSettlement);
  }
}
