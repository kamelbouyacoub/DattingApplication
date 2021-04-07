import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

 

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  
  members: Member[] = [];

  constructor(private http: HttpClient) { }

  getMembers(){
    if(this.members.length > 0) return of(this.members);
    return this.http.get<Member[]>(environment.user).pipe(map(members => {
      this.members = members;
      return members;
    }))
  }

  getMember(username: string |null ){
    const member = this.members.find(m => m.userName === username);
    if(member !== undefined) return of(member);
    return this.http.get<Member>(environment.user+ `/${username}`);
  }
  
  updateMember(member: Member){
    return this.http.put(environment.user , member).pipe(map(() => {
      const index = this.members.indexOf(member);
      this.members[index]  = member;
    }));
  }
}
