import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SliptransactionsService } from '../services/sliptransactions.service';
import { Users } from '../Models/Users';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users:Users[] = []
  displayedColumns: string[] = ['ID', 'Name', 'Email', 'Azure ID'];
  dataSource = this.users;

  constructor(
    private sliptransactionService: SliptransactionsService,
    private spinner: NgxSpinnerService,

  ){}

  async ngOnInit(){
    this.spinner.show()
    await this.getuserslist()
  }

  async getuserslist(){
    this.spinner.show()

    await this.sliptransactionService.getuserlist().subscribe((res:Users[]) => {
      this.users = res
      this.dataSource = this.users;

      this.spinner.hide()
    })
  }
}
