import { Component } from '@angular/core';
import { GlobalVarService } from '../shared/services/global-var.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(
    public globalVar: GlobalVarService
  ){
    this.globalVar.checkToken()
  }
}
