import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

 

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  
  constructor(private http: HttpClient) { }

  getMembers(){
    return this.http.get<Member[]>(environment.user)
  }

  getMember(username: string |null ){
    return this.http.get<Member>(environment.user+ `/${username}`);
  }
  
}
