import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Users, UsersResponse, UsersResponseOne, UsersResponseString } from '../Models/Users';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../Dialog/snackbar/snackbar.component';

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
    _id: "",
    name: "",
    email: "",
    phone: 0,
    picture: "",
    last_login: "",
    uid: ""
  }
  isLoading:boolean = true
  valueChanged:boolean = false
  nameError:boolean = false
  phoneError:boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private userService: UserService,
  ){}

  ngOnInit(){
    this.getLoggedInUser()
  }

  checkChangedValue(){
    if(this.users.name != this.createform.controls['name'].value){
      this.valueChanged = true
    }else if(this.users.email != this.createform.controls['email'].value){
      this.valueChanged = true
    }else if(this.users.phone != this.createform.controls['phone'].value){
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
      this.createform.controls['name'].setValue(this.users.name)
      this.createform.controls['email'].setValue(this.users.email)
      this.createform.controls['phone'].setValue(this.users.phone)
    })
  }

  updateUser(){
    if(this.createform.valid){
      var newUser:Users = this.users
      newUser.name = this.createform.controls['name'].value
      newUser.phone = this.createform.controls['phone'].value
      
      this.isLoading = true
      this.userService.updateUser(newUser).subscribe((res:UsersResponseString) => {
      this.isLoading = false
      this.getLoggedInUser()
      this.checkChangedValue()
      this.snackBar.openFromComponent(SnackbarComponent, 
        {
          data: {
            message: "Your Details is Updated Successfully",
            status: "success"
          },
          panelClass: ['success-sb']
        });
      })
    }else{
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: {
          message: "Please Enter the Valid Value",
          status: "info"
        },
        panelClass: ['info-sb']
      });
    }

  }

}
