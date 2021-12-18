import { Component, Input, OnInit } from '@angular/core';
import { faEnvelope, faHeart, faUser } from '@fortawesome/free-regular-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

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
  constructor(private memberService: MembersService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.faUser = faUser;
    this.faHeart = faHeart;
    this.faEnvelope = faEnvelope;
  }

  addLike(member: Member){
      this.memberService.addLike(member.userName).subscribe(() => {
        this.toastr.success('You have liked '+ member.knowAs);
      });
  }
}
