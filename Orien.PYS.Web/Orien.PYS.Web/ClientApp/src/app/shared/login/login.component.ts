declare var google:any;
import { Component } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthapiService } from '../services/authapi.service';
import { UserDetails } from '../Models/UserDetails';
import { GlobalVarService } from '../services/global-var.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  google:any;
  createform = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })
  userInfo:any

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthServiceService,
    private authAPIService: AuthapiService,
    private globalVar: GlobalVarService
  ){}

  ngOnInit(){
    google.accounts.id.initialize({
      client_id: '156985885803-62ok5adedqmmg3nr0vj24b9sh5jjtvih.apps.googleusercontent.com',
      callback: (res:any) =>{
        this.authService.setAccessToken(res.credential)
        this.userInfo = this.decodeToken(res.credential);
        this.globalVar.createUser()
        sessionStorage.setItem('UserInfo', JSON.stringify(this.userInfo))

        var user:UserDetails = {
          uid: this.userInfo.sub,
          name: this.userInfo.name,
          email: this.userInfo.email
        }
        this.authAPIService.checkUser(user).subscribe((res) => {
        })

        this.router.navigate(['/'])
      }
    });

    google.accounts.id.renderButton(document.getElementById("google-btn"),{
      theme: 'filled-blue',
      size: 'large',
      shape: 'rectangle',
      width: 100
    })
  }

  decodeToken(token:string){
    return JSON.parse(atob(token.split(".")[1]))
  }

  login(){
  }
}
