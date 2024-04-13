import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GroupService } from '../../services/group.service';
import { CreateGroup } from '../../Models/CreateGroup';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalVarService } from '../../services/global-var.service';
import { GroupResponse } from '../../Models/Group';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent {
  isLoading: boolean = false
  createGroupform = this.formBuilder.nonNullable.group({
    Name: ['', [Validators.required, Validators.minLength(2)]],
    Description: ['', Validators.minLength(5)]
  })

  constructor(
    public dialogRef: MatDialogRef<CreateGroupComponent>,
    private groupService: GroupService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private globalVar: GlobalVarService
  ){}

  ngOnInit(){
    this.globalVar.checkToken()
  }

  createGroup(){
    this.isLoading = true
    var group:CreateGroup = {
      name: this.createGroupform.controls['Name'].value,
      description: this.createGroupform.controls['Description'].value,
      admin: this.globalVar.user.id,
      members: [this.globalVar.user.id],
      created_on: new Date(),
      updated_on: new Date()
    }

    this.groupService.createGroup(group).subscribe((group:GroupResponse) => {
      this.isLoading = false
      if(!group.err){
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: "The Group is Created Successfully",
            status: "success"
          },
          panelClass: ['success-sb']
        });
        this.dialogRef.close(true);
      }
    })
  }
}
