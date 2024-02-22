import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BASE_URL } from '../constants';
import { AddSlip } from '../Models/AddSlip';
import { Users } from '../Models/Users';
import { SlipTransactionVM } from '../Models/SlipTransactionVM';
import { environment } from 'src/environments/environment';
import { AuthServiceService } from './auth-service.service';
import { AuthapiService } from './authapi.service';
import { GlobalVarService } from './global-var.service';

@Injectable({
  providedIn: 'root'
})
export class SliptransactionsService {
  url = 'api/SlipTransaction'
  
  constructor(
    private authApiService: AuthapiService,
    private authService: AuthServiceService,
    private globalVar: GlobalVarService
  ) { }

  getuserlist(){
    return this.authApiService.get<Users[]>(this.url + "/users");
  }

  getuser(azureId:string){
    return this.authApiService.get<Users>(this.url + "/user?azureId=" + azureId);
  }

  getotheruserlist(){
    return this.authApiService.get<Users[]>(this.url + "/other-users?azureId=" + this.globalVar.user.uid);
  }

  getslipayment(){
    return this.authApiService.get<SlipTransactionVM[]>(this.url + "?userid=" + this.globalVar.user.uid);
  }

  deleteslipayment(slipid:number){
    return this.authApiService.delete<boolean>(this.url + "/" + slipid);
  }

  Addslipayment(sliptransaction: AddSlip){
    return this.authApiService.post(this.url + '/add-slip', sliptransaction);
  }
}
