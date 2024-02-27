declare var google:any;
import { Component } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthapiService } from '../services/authapi.service';
import { UserDetails } from '../Models/UserDetails';
import { GlobalVarService } from '../services/global-var.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

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
    private spinner: NgxSpinnerService,
    private authAPIService: AuthapiService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private globalVar: GlobalVarService
  ){}

  ngOnInit(){
    this.spinner.show()
    google.accounts.id.initialize({
      client_id: environment.google.client_id,
      callback: (res:any) =>{
        this.authService.setAccessToken(res.credential)
        this.userInfo = this.decodeToken(res.credential);
        if(this.userInfo){

          sessionStorage.setItem('UserInfo', JSON.stringify(this.userInfo))
          sessionStorage.setItem('UId', this.userInfo.sub)
          this.globalVar.createUser()
          var groupId = this.route.snapshot.paramMap.get('groupid')!
          var inviteId = this.route.snapshot.paramMap.get('invite')!
          var user:UserDetails = {
            uId: this.userInfo.sub,
            name: this.userInfo.name,
            email: this.userInfo.email,
            picture: this.userInfo.picture,
            group_UId: groupId == null ? "" : groupId,
            invite_UId: inviteId == null ? "" : inviteId
          }

          this.authAPIService.checkUser(user).subscribe((res:string) => {
            this.spinner.hide()
            if(res != "Invite is InValid"){
              this.router.navigate(['/group'])
            }else{
              this.toastr.error(res, "Error")
            }
          }, (error) => {
            this.toastr.error(error.error.title, "Error")
            console.error('Error occurred:', error);
          })
          
        }
      }
    });

    google.accounts.id.renderButton(document.getElementById("google-btn"),{
      theme: 'outline',
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
