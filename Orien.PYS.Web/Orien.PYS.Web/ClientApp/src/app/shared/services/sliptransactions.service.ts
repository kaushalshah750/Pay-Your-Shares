import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BASE_URL } from '../constants';
import { AddSlip } from '../Models/AddSlip';
import { Users } from '../Models/Users';
import { SlipTransactionVM } from '../Models/SlipTransactionVM';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SliptransactionsService {
  url = environment.baseUrl + 'api/SlipTransaction/'
  constructor(
    private http: HttpClient,
  ) { }

  getuserlist(){
    return this.http.get<Users[]>(this.url + "users");
  }

  getslipayment(){
    return this.http.get<SlipTransactionVM[]>(this.url);
  }

  Addslipayment(sliptransaction: AddSlip){
    return this.http.post(this.url + 'add-slip', sliptransaction);
  }

  // private buildUrl(apiUrl:string, id?: any){
  //   var url = `${this.baseUrl}${apiUrl}`;
  //   return (id === null || typeof (id) === 'undefined') ? url : `${url}/${encodeURIComponent(id)}`;
  // }
}
