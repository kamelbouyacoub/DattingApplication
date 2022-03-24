import { Component, OnInit } from '@angular/core';
import { User } from './_models/User';
import { AccountService } from './_services/account.service';
import { PresenceService } from './_services/presence.service';

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
  constructor( private accountService: AccountService, private presenceService: PresenceService) {
    

  }
  ngOnInit() {
     this.setCurrentUser();
  }

  setCurrentUser(){
    var jsonUser: any = localStorage.getItem('user')?.toString();
    if(!jsonUser) return;
    const user: User = JSON.parse(jsonUser);
    if(user){
      this.accountService.setCurrentUser(user);
      this.presenceService.createHubConnection(user)    ;
    }
    
  }
 
}
