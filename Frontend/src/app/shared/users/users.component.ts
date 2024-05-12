import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SliptransactionsService } from '../services/sliptransactions.service';
import { Users } from '../Models/Users';
import { GlobalVarService } from '../services/global-var.service';
import { AuthUser } from '../Models/AuthUser';

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
    private globalVarService: GlobalVarService
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
    }, (error) => {
      if (error.status == 401){
        this.globalVarService.getRefreshToken(this.globalVarService.getRefreshAccessToken()!).subscribe((res:AuthUser) => {
          if(res.id_token){
            localStorage.setItem(this.globalVarService.accessTokenKey, res.id_token)
            this.getuserslist()
          }
        })
      }
    })
  }
}
