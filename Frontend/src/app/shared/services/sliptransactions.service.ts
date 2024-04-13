import { Injectable } from '@angular/core';
import { AddSlip } from '../Models/AddSlip';
import { Users } from '../Models/Users';
import { SlipResponse, SlipTransactionVM } from '../Models/SlipTransactionVM';
import { AuthServiceService } from './auth-service.service';
import { AuthapiService } from './authapi.service';
import { GlobalVarService } from './global-var.service';
import { SlipTransactionBody } from '../Models/SlipTransactionBody';

@Injectable({
  providedIn: 'root'
})
export class SliptransactionsService {
  url = 'api/split-transaction'
  
  constructor(
    private authApiService: AuthapiService,
  ) { }

  getuserlist(){
    return this.authApiService.get<Users[]>(this.url + "/users");
  }

  getuser(){
    return this.authApiService.get<Users>(this.url + "/user");
  }

  getotheruserlist(){
    return this.authApiService.get<Users[]>(this.url + "/other-users");
  }

  getslipayment(slipTransaction:SlipTransactionBody){
    return this.authApiService.post<SlipResponse>(this.url + "/get-transaction", slipTransaction);
  }

  deleteslipayment(slipid:string){
    return this.authApiService.delete<SlipResponse>(this.url + "/" + slipid + "/delete");
  }

  Addslipayment(sliptransaction: AddSlip){
    return this.authApiService.post<SlipResponse>(this.url + '/create', sliptransaction);
  }
}
