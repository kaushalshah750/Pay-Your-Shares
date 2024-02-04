import { Component } from '@angular/core';
import { Users } from '../../Models/Users';
import { FormBuilder, Validators } from '@angular/forms';
import { SliptransactionsService } from '../../services/sliptransactions.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { GroupService } from '../../services/group.service';
import { Group } from '../../Models/Group';
import { AddGroupMember } from '../../Models/AddGroupMember';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent {
  users:Users[] = []
  userlist:number[] = []

  createGroupform = this.formBuilder.nonNullable.group({
    Name: ['', [Validators.required, Validators.minLength(5)]],
    Description: ['', [Validators.required, Validators.minLength(5)]],
    Users: [[], [Validators.required]]
  })

  constructor(
    private sliptransactionService: SliptransactionsService,
    private spinner: NgxSpinnerService,
    private groupService: GroupService,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(){
    this.getuserslist()
  }

  async getuserslist(){
    this.spinner.show()

    await this.sliptransactionService.getuserlist().subscribe((res:Users[]) => {
      this.users = res
      this.spinner.hide()
    })
  }

  createGroupWithMember(){
    var group:Group = {
      id: 0,
      name: this.createGroupform.controls['Name'].value,
      description: this.createGroupform.controls['Description'].value
    }

    this.groupService.createGroup(group).subscribe((group:Group) => {
      if(group){
        var addmember:AddGroupMember = {
          Id: group.id,
          Users: this.createGroupform.controls['Users'].value
        }
        this.groupService.createGroupMember(addmember).subscribe((res:boolean) =>{
        })
      }
    })
  }

  clearfields(){
    this.createGroupform.controls.Name.setValue('')
    this.createGroupform.controls.Description.setValue('')
  }


}
