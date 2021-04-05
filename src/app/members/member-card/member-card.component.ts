import { Component, Input, OnInit } from '@angular/core';
import { faEnvelope, faHeart, faUser } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
  
})
export class MemberCardComponent implements OnInit {
  
  @Input() member: any;
  faUser : any;
  faHeart: any;
  faEnvelope: any;
  constructor() { }

  ngOnInit(): void {
    this.faUser = faUser;
    this.faHeart = faHeart;
    this.faEnvelope = faEnvelope;
  }

}
