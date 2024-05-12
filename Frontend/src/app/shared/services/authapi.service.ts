import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDetails } from '../Models/UserDetails';
import { GlobalVarService } from './global-var.service';

@Injectable({
  providedIn: 'root'
})
export class AuthapiService {

  private apiUrl = environment.baseUrl;
  url:string = "api/Authentication/"

  constructor(
    private http: HttpClient,
    private globalService: GlobalVarService
  ) {}

  get<T>(endpoint: string): Observable<T> {
    const headers = this.createHeaders();
    return this.http.get<T>(`${this.apiUrl}${endpoint}`, { headers });
  }

  post<T>(endpoint: string, data:any): Observable<T> {
    const headers = this.createHeaders();
    return this.http.post<T>(`${this.apiUrl}${endpoint}`, data, { headers });
  }

  put<T>(endpoint: string, data:any): Observable<T> {
    const headers = this.createHeaders();
    return this.http.put<T>(`${this.apiUrl}${endpoint}`, data, { headers });
  }

  delete<T>(endpoint: string): Observable<T> {
    const headers = this.createHeaders();
    return this.http.delete<T>(`${this.apiUrl}${endpoint}`, { headers });
  }

  checkUser(user:UserDetails): Observable<string> {
    return this.http.post(`${this.apiUrl}${this.url}` + "check-user", user, {
      responseType: 'text'
    });
  }

  private createHeaders(): HttpHeaders {
    const token = this.globalService.getAccessToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }
}
