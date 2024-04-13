import { Injectable } from '@angular/core';
import { AuthapiService } from './authapi.service';
import { FeedBack, FeedBackResponse } from '../Models/FeedBack';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  url = 'api/create-feedback'

  constructor(
    private authservice: AuthapiService
  ) { }

  createFeedback(feedback:FeedBack){
    return this.authservice.post<FeedBackResponse>(this.url, feedback)
  }
}
