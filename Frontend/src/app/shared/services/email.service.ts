import { Injectable } from '@angular/core';
import { AuthapiService } from './authapi.service';
import { EmailBody, EmailResponse } from '../Models/EmailBody';
import { SMSBody } from '../Models/SMSBody';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  url = 'api/email'

  constructor(
    private authservice: AuthapiService
  ) { }

  sendEmail(emailBody: EmailBody){
    return this.authservice.post<EmailResponse>(this.url, emailBody)
  }

  sendSMS(sms:SMSBody){
    return this.authservice.post<string>(this.url + "SMS", sms)
  }
}
