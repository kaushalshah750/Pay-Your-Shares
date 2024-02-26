import { Injectable } from '@angular/core';
import { AuthapiService } from './authapi.service';
import { FeedBack } from '../Models/FeedBack';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  url = 'api/Feedbacks'

  constructor(
    private authservice: AuthapiService
  ) { }

  createFeedback(feedback:FeedBack){
    return this.authservice.post<boolean>(this.url, feedback)
  }
}
