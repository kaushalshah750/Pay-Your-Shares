import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { GroupService } from '../../services/group.service';
import { CreateGroup } from '../../Models/CreateGroup';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent {
  createGroupform = this.formBuilder.nonNullable.group({
    Name: ['', [Validators.required, Validators.minLength(5)]],
    Description: ['', [Validators.required, Validators.minLength(5)]]
  })

  constructor(
    public dialogRef: MatDialogRef<CreateGroupComponent>,
    private groupService: GroupService,
    private formBuilder: FormBuilder
  ){}

  createGroup(){
    var group:CreateGroup = {
      Name: this.createGroupform.controls['Name'].value,
      Description: this.createGroupform.controls['Description'].value,
    }

    this.groupService.createGroup(group).subscribe((group:boolean) => {
      if(group){
        this.dialogRef.close(true);
      }
    })
  }

  clearfields(){
    this.createGroupform.controls.Name.setValue('')
    this.createGroupform.controls.Description.setValue('')
  }
}
