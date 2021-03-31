import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from './models/User';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The dating app';
  users: any;


  /**
   *
   */
  constructor( private accountService: AccountService) {
    

  }
  ngOnInit() {
     this.setCurrentUser();
  }

  setCurrentUser(){
    var jsonUser: any = localStorage.getItem('user')?.toString();
    if(!jsonUser) return;
    const user: User = JSON.parse(jsonUser);
    this.accountService.setCurrentUser(user);
  }
 
}
