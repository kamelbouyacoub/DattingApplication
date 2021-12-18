import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/Pagination';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  members: Partial<Member[]>;
  predicate: string  = 'liked';
  pageNumber = 1;
  pageSize = 2;
  pagination: Pagination;

  constructor(private memberService: MembersService) { }

  ngOnInit(): void {
    this.loadLikes();
    
  }
  loadLikes(){
    this.memberService.getLikes(this.predicate, this.pageNumber, this.pageSize).subscribe(response => {
      this.pagination = response.pagination;
      this.members = response.result;
    });
  }

  
  pagechanged(event: any){
    this.pageNumber = event.page;
    this.loadLikes();
   }
} 
