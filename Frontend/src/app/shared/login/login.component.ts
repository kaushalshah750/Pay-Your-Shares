declare var google: any;
import { Component } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { GlobalVarService } from '../services/global-var.service';
import { environment } from 'src/environments/environment';
import { UsersResponseOne, UsersResponseString } from '../Models/Users';
import { GroupService } from '../services/group.service';
import { GroupAddResponseOne } from '../Models/Group';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';
import { SnackbarComponent } from '../Dialog/snackbar/snackbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  createform = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })
  isLoading: boolean = false
  userInfo: any
  groupId = this.route.snapshot.paramMap.get('groupid')!
  inviteId = this.route.snapshot.paramMap.get('invite')!

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthServiceService,
    private route: ActivatedRoute,
    private userService: UserService,
    private groupService: GroupService,
    private snackBar: MatSnackBar,
    private globalVar: GlobalVarService,
  ) { }

  ngOnInit() {
    // this.login()
  }

  // google.accounts.id.initialize({
  //   client_id: environment.google.client_id,
  //   callback: (res:any) =>{
  //     this.isLoading = true
  //     this.authService.setAccessToken(res.credential)
  //     this.userInfo = this.decodeToken(res.credential);
  //     console.log(this.userInfo)
  //     console.log(this.userInfo)
  //     if(this.userInfo){
  //       this.isLoading = true
  //       localStorage.setItem('UId', this.userInfo.sub)
  //       this.userService.getLoggedInUser().subscribe((res:UsersResponseOne) => {
  //         this.globalVar.user.User_id = res.data.User_id
  //         this.globalVar.user.Name = res.data.Name
  //         this.globalVar.user.Email = res.data.Email
  //         this.globalVar.user.Picture = res.data.Picture
  //         this.globalVar.user.Phone = res.data.Phone
  //       })

  //       if(this.groupId != null){
  //         var reference = {
  //           group: this.groupId,
  //           invite: this.inviteId
  //         }
  //         this.isLoading = true
  //         this.userService.checkUser().subscribe((res:UsersResponseString)=>{
  //           if(!res.err){
  //             this.groupService.addMemberinGroup(reference).subscribe((res:GroupAddResponseOne) => {
  //               this.isLoading = false
  //               if(res.data == "You Already exits in the Group"){
  //                 this.snackBar.openFromComponent(SnackbarComponent, {
  //                   data: {
  //                     message: "You Already exits in the Group",
  //                     status: "info"
  //                   },
  //                   panelClass: ['info-sb']
  //                 });
  //                 this.router.navigate(['/group'])
  //               }else if (!res.err && res.data != "Invitation Link is Invalid"){
  //                 this.snackBar.openFromComponent(SnackbarComponent, {
  //                   data: {
  //                     message: "You have been Successfully Added to the Group",
  //                     status: "success"
  //                   },
  //                   panelClass: ['success-sb']
  //                 });
  //                 this.router.navigate(['/group'])
  //               }else if (res.data == "Invitation Link is Invalid"){
  //                 this.snackBar.open("Invitation Link is Invalid");
  //               }
  //             })
  //           }else{
  //             this.snackBar.openFromComponent(SnackbarComponent, {
  //               data: {
  //                 message: "There is some issue with the Service. Try Again Later.",
  //                 status: "error"
  //               },
  //               panelClass: ['error-sb']
  //             });    
  //           }
  //         })
  //       }else{
  //         this.isLoading = true
  //         this.userService.checkUser().subscribe((res:UsersResponseString)=>{
  //           this.isLoading = false
  //           if(!res.err){
  //             if(res.data == "User Already Exists"){
  //               this.snackBar.openFromComponent(SnackbarComponent, {
  //                 data: {
  //                   message: "You have Successfully Logged In",
  //                   status: "success"
  //                 },
  //                 panelClass: ['success-sb']
  //               });      
  //             }else if(res.data == "New User Created"){
  //               this.snackBar.openFromComponent(SnackbarComponent, {
  //                 data: {
  //                   message: "You have Successfully Signned In",
  //                   status: "success"
  //                 },
  //                 panelClass: ['success-sb']
  //               });      
  //             }
  //             this.router.navigate(['/group'])
  //           }else{
  //             this.snackBar.openFromComponent(SnackbarComponent, {
  //               data: {
  //                 message: "There is some issue with the Service. Try Again Later.",
  //                 status: "error"
  //               },
  //               panelClass: ['error-sb']
  //             });    
  //           }
  //         })
  //       }
  //     }
  //   }
  // });


  callGoogleUrl() {
    // var scope:string = "https://www.googleapis.com/auth/userinfo.email&https://www.googleapis.com/auth/userinfo.profile&openid"
    var scope: string = "https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile"
    var url = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${window.location.origin}/&prompt=consent&response_type=code&client_id=${environment.google.client_id}&scope=${scope}&access_type=offline`
    console.log(url)
    window.location.href = url
  }

  handleCredentialResponse(response: any) {
  }

  decodeToken(token: string) {
    return JSON.parse(atob(token.split(".")[1]))
  }

  login() {
    this.userService.getLoggedIn().subscribe((res) => {

    })
  }
}
