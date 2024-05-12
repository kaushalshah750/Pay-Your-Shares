import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Users, UsersResponse, UsersResponseOne, UsersResponseString } from '../Models/Users';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../Dialog/snackbar/snackbar.component';
import { AuthUser } from '../Models/AuthUser';
import { GlobalVarService } from '../services/global-var.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {
  createform = this.formBuilder.nonNullable.group({
    name: ["", [Validators.required, Validators.minLength(5)]],
    email: [{value: "", disabled:true}, [Validators.required, Validators.email]],
    phone: [0, [Validators.required, Validators.pattern("^[0-9]{10}$")]],
  })
  users: Users = {
    User_id: 0,
    Name: "",
    Email: "",
    Phone: 0,
    Picture: "",
  }
  isLoading:boolean = true
  valueChanged:boolean = false
  nameError:boolean = false
  phoneError:boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private globalVarService: GlobalVarService,
    private snackbarService: SnackbarService,
    private userService: UserService,
  ){}

  ngOnInit(){
    this.getLoggedInUser()
  }

  checkChangedValue(){
    if(this.users.Name != this.createform.controls['name'].value){
      this.valueChanged = true
    }else if(this.users.Email != this.createform.controls['email'].value){
      this.valueChanged = true
    }else if(this.users.Phone != this.createform.controls['phone'].value){
      this.valueChanged = true
    }else{
      this.phoneError = false
      this.nameError = false
      this.valueChanged = false
    }
    
    if(this.createform.invalid){
      this.valueChanged = false
    }
  }

  getLoggedInUser(){
    this.isLoading = true
    this.userService.getLoggedInUser().subscribe((res:UsersResponseOne) => {
      this.isLoading = false
      this.users = res.data
      this.createform.controls['name'].setValue(this.users.Name)
      this.createform.controls['email'].setValue(this.users.Email)
      this.createform.controls['phone'].setValue(this.users.Phone)
    }, (error) => {
      if (error.status == 401){
        this.globalVarService.getRefreshToken(this.globalVarService.getRefreshAccessToken()!).subscribe((res:AuthUser) => {
          if(res.id_token){
            localStorage.setItem(this.globalVarService.accessTokenKey, res.id_token)
            this.getLoggedInUser()
          }
        })
      }
    })
  }

  updateUser(){
    if(this.createform.valid){
      var newUser:Users = this.users
      newUser.Name = this.createform.controls['name'].value
      newUser.Phone = this.createform.controls['phone'].value
      
      this.isLoading = true
      this.userService.updateUser(newUser).subscribe((res:UsersResponseString) => {
        this.isLoading = false
        this.getLoggedInUser()
        this.checkChangedValue()
        this.snackbarService.openSuccessSnackbar("Your Details is Updated Successfully")
      }, (error) => {
        if (error.status == 401){
          this.globalVarService.getRefreshToken(this.globalVarService.getRefreshAccessToken()!).subscribe((res:AuthUser) => {
            if(res.id_token){
              localStorage.setItem(this.globalVarService.accessTokenKey, res.id_token)
              this.updateUser()
            }
          })
        }
      })
    }else{
      this.snackbarService.openInfoSnackbar("Please Enter the Valid Value")
    }
  }
}
