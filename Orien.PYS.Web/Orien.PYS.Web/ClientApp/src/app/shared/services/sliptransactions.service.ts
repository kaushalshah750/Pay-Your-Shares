import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BASE_URL } from '../constants';
import { AddSlip } from '../Models/AddSlip';
import { Users } from '../Models/Users';
import { SlipTransactionVM } from '../Models/SlipTransactionVM';
import { environment } from 'src/environments/environment';
import { AuthServiceService } from './auth-service.service';
import { AuthapiService } from './authapi.service';

@Injectable({
  providedIn: 'root'
})
export class SliptransactionsService {
  url = 'api/SlipTransaction'
  constructor(
    private http: HttpClient,
    private authApiService: AuthapiService,
    private authService: AuthServiceService
  ) { }

  getuserlist(){
    return this.authApiService.get<Users[]>(this.url + "/users");
  }

  getslipayment(){
    return this.authApiService.get<SlipTransactionVM[]>(this.url + "?userid=" + this.authService.getAzureID());
  }

  Addslipayment(sliptransaction: AddSlip){
    return this.authApiService.post(this.url + '/add-slip', sliptransaction);
  }
}
