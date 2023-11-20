import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreditCardStatement } from '../Models/CreditCardStatement';
import { CreditCardSummary } from '../Models/CreditCardSummary';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  url = environment.baseUrl + 'api/CreditCard'

  constructor(private http: HttpClient) { }

  getcreditcardlist(){
    return this.http.get<CreditCardSummary[]>(this.url)
  }

  getcreditcardstatementlist(){
    return this.http.get<CreditCardStatement[]>(this.url + "/Statement")
  }

}
