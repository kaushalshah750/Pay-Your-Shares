import { Injectable } from '@angular/core';
import { AuthapiService } from './authapi.service';
import { EmailBody } from '../Models/EmailBody';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  url = 'api/Email'

  constructor(
    private authservice: AuthapiService
  ) { }

  sendEmail(emailBody: EmailBody){
    return this.authservice.post<boolean>(this.url, emailBody)
  }
}
