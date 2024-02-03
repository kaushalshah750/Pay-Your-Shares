import { Injectable } from '@angular/core';
import { AuthapiService } from './authapi.service';
import { EmailBody } from '../Models/EmailBody';
import { SMSBody } from '../Models/SMSBody';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  url = 'api/'

  constructor(
    private authservice: AuthapiService
  ) { }

  sendEmail(emailBody: EmailBody){
    return this.authservice.post<boolean>(this.url + "Email", emailBody)
  }

  sendSMS(sms:SMSBody){
    return this.authservice.post<string>(this.url + "SMS", sms)
  }
}
