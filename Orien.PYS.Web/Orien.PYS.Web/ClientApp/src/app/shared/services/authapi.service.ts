import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDetails } from '../Models/UserDetails';

@Injectable({
  providedIn: 'root'
})
export class AuthapiService {

  private apiUrl = environment.baseUrl;
  url:string = "api/Authentication/"

  constructor(
    private http: HttpClient,
    private authService: AuthServiceService
  ) {}

  get<T>(endpoint: string): Observable<T> {
    const headers = this.createHeaders();
    return this.http.get<T>(`${this.apiUrl}${endpoint}`, { headers });
  }

  post<T>(endpoint: string, data:any): Observable<T> {
    const headers = this.createHeaders();
    return this.http.post<T>(`${this.apiUrl}${endpoint}`, data, { headers });
  }

  delete<T>(endpoint: string): Observable<T> {
    const headers = this.createHeaders();
    return this.http.delete<T>(`${this.apiUrl}${endpoint}`, { headers });
  }

  checkUser(user:UserDetails){
    return this.http.post<string>(`${this.apiUrl}${this.url}` + "check-user", user);
  }

  // Add more methods (post, put, delete) as needed

  private createHeaders(): HttpHeaders {
    const token = this.authService.getAccessToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }
}
