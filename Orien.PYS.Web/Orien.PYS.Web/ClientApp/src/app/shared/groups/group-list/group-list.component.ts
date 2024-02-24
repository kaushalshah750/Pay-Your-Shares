import { Component } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { Group } from '../../Models/Group';
import { GlobalVarService } from '../../services/global-var.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateGroupComponent } from '../../Dialog/create-group/create-group.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent {
  groups:Group[] = []

  constructor(
    private spinner: NgxSpinnerService,
    private groupService: GroupService,
    private globalVar: GlobalVarService,
    public dialog: MatDialog,
  ){}
  
  ngOnInit(){
    this.globalVar.checkToken()
    this.getGroups()
  }

  addgroup(){
    const dialogRef = this.dialog.open(CreateGroupComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getGroups()
      }else{
        this.spinner.hide()
      }
    });
  }

  getGroups(){
    this.groupService.getGroups().subscribe((res:Group[])=>{
      this.groups = res
    })
  }
}
