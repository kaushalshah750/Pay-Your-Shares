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
    private authservice: AuthapiService
  ) { }

  getuserlist(){
    return this.authservice.get<Users[]>(this.url + "/users");
    // return this.http.get<Users[]>(this.url + "users");
  }

  getslipayment(){
    // return this.authservice.apiCall(this.url)
    return this.authservice.get<SlipTransactionVM[]>(this.url);
  }

  Addslipayment(sliptransaction: AddSlip){
    return this.authservice.post(this.url + '/add-slip', sliptransaction);
  }
}
