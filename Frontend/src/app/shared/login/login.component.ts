declare var google: any;
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { GlobalVarService } from '../services/global-var.service';
import { environment } from 'src/environments/environment';
import { UsersResponseString } from '../Models/Users';
import { GroupService } from '../services/group.service';
import { GroupAddResponseOne } from '../Models/Group';
import { UserService } from '../services/user.service';
import { AuthUser } from '../Models/AuthUser';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent {
  createform = this.formBuilder.nonNullable.group({
    Email: ['', [Validators.required, Validators.email]],
    Code: ['', [Validators.required]]
  })
  isLoading: boolean = false
  userInfo: any
  groupId = this.route.snapshot.paramMap.get('groupid')!
  inviteId = this.route.snapshot.paramMap.get('invite')!

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private groupService: GroupService,
    private snackBarService: SnackbarService,
    public globalVarService: GlobalVarService,
  ) {

    this.createform.controls['Email'].disable()
    this.createform.controls['Code'].disable()

    if (this.groupId != null && this.inviteId != null) {
      localStorage.setItem("groupId", this.groupId)
      localStorage.setItem("inviteId", this.inviteId)
      this.groupService.getGroupInvitationDetail(this.groupId, this.inviteId).subscribe((res: any) => {
        if (res.data) {
          this.createform.controls['Email'].setValue(res.data)
          this.createform.controls['Code'].setValue(this.inviteId)
          snackBarService.openSuccessSnackbar("Invitation Link is Valid")
        } else {
          snackBarService.openErrorSnackbar("Invitation Link is Invalid. Try Again")
        }
      });
    }

    var token = localStorage.getItem("token")
    var refresh_token = localStorage.getItem("refresh_token")
    if ((!token || !refresh_token) && window.location.search.split("&")[0].slice(1, 5) != "code") {
      // window.location.href = window.location.origin + "/login"
    } else {
      if (window.location.search.split("&")[0].slice(1, 5) == "code") {
        globalVarService.getToken(window.location.search.split("&")[0].slice(6)).subscribe((res: AuthUser) => {
          localStorage.setItem("token", res.id_token)
          localStorage.setItem("refresh_token", res.refresh_token)
          this.groupId = localStorage.getItem("groupId")!
          this.inviteId = localStorage.getItem("inviteId")!
          if (this.groupId != null && this.inviteId != null) {
            var reference = {
              group: this.groupId,
              invite: this.inviteId
            }

            this.userService.checkUser().subscribe((res: UsersResponseString) => {
              if (!res.err) {
                this.groupService.addMemberinGroup(reference).subscribe((res: GroupAddResponseOne) => {
                  this.isLoading = false
                  if (res.data == "You Already exits in the Group") {
                    this.navigatetoGroup()
                    snackBarService.openInfoSnackbar("You Already exits in the Group")
                    this.router.navigate(['/group'])
                  } else if (!res.err && res.data != "Invitation Link is Invalid") {
                    this.navigatetoGroup()
                    snackBarService.openSuccessSnackbar("You have been Successfully Added to the Group")
                    this.router.navigate(['/group'])
                  } else if (res.data == "Invitation Link is Invalid") {
                    snackBarService.openErrorSnackbar("Invitation Link is Invalid")
                  }
                })
              } else {
                snackBarService.openErrorSnackbar("There is some issue with the Service. Try Again Later.")
              }
            })
          } else {
            this.navigatetoGroup()
            this.isLoading = true
            this.userService.checkUser().subscribe((res: UsersResponseString) => {
              this.isLoading = false
              if (!res.err) {
                if (res.data == "User Already Exists") {
                  snackBarService.openSuccessSnackbar("You have Successfully Logged In")
                } else if (res.data == "New User Created") {
                  snackBarService.openSuccessSnackbar("You have Successfully Signned In")
                }
                this.router.navigate(['/group'])
              } else {
                snackBarService.openErrorSnackbar("There is some issue with the Service. Try Again Later.")
              }
            })
          }
        })
      }
    }
  }

  navigatetoGroup() {
    this.router.navigate(['/group']).then(() => {
      var userInfo = this.decodeToken(localStorage.getItem(this.globalVarService.accessTokenKey)!);
      localStorage.setItem('UserInfo', JSON.stringify(userInfo))
      this.snackBarService.openSuccessSnackbar("You have been successfully Logged In")
    })
  }

  ngOnInit() {
    // this.login()
  }

  // google.accounts.id.initialize({
  //   client_id: environment.google.client_id,
  //   callback: (res:any) =>{
  //     this.isLoading = true
  //     this.authService.setAccessToken(res.credential)
  //     this.userInfo = this.decodeToken(res.credential);
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
    var url = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${window.location.origin}/login&prompt=consent&response_type=code&client_id=${environment.google.client_id}&scope=${scope}&access_type=offline`
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
