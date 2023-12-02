import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreditCardStatement } from '../Models/CreditCardStatement';
import { CreditCardSummary } from '../Models/CreditCardSummary';
import { environment } from 'src/environments/environment';
import { AuthServiceService } from './auth-service.service';
import { AuthapiService } from './authapi.service';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  url = 'api/CreditCard'

  constructor(
    private authservice: AuthapiService
  ) { }

  getcreditcardlist(){
    return this.authservice.get<CreditCardSummary[]>(this.url)
  }

  getcreditcardstatementlist(){
    return this.authservice.get<CreditCardStatement[]>(this.url + "/Statement")
  }

}
