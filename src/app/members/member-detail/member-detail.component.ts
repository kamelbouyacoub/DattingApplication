 import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { Message } from 'src/app/_models/Message';
import { User } from 'src/app/_models/User';
import { AccountService } from 'src/app/_services/account.service';
 import { MembersService } from 'src/app/_services/members.service';
import { MessageService } from 'src/app/_services/message.service';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit , OnDestroy{
  @ViewChild("memberTabs", {static: true}) memberTabs: TabsetComponent;

  member!: Member;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];
  activeTab: TabDirective;
  messages: Message[] = [];
  user: User;

  constructor(public presence: PresenceService, private route: ActivatedRoute, private messageService: MessageService, private accountService: AccountService
            , private router: Router) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe( user => {
      this.user = user;
    })

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
 
  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.member = data.member;
    });

    
    this.route.queryParams.subscribe(params => {
      params.tab ? this.selectTab(params.tab): this.selectTab(0);
  })

  
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        previewArrowsAutoHide : false,
        arrowNextIcon: "fa fa-arrow-circle-right",
        arrowPrevIcon : "fa fa-arrow-circle-left"

      }
    ];
    
    this.galleryImages = this.getImages();
  }

 
  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }
  

  getImages(): NgxGalleryImage[]{
    const imageUrl = [];
    if(this.member?.photos) {
      for(var photo of this.member.photos){
        imageUrl.push({
          small: photo.url,
          medium: photo.url,
          big: photo.url
        });
      }
    }
    

    return imageUrl;
  }


  loadMessages(){
    this.messageService.getMessageThread(this.member.userName).subscribe(messages => {
      this.messages = messages;
    });
  }
  
  selectTab(tabId: any){
    if(tabId === "3")this.memberTabs.tabs[tabId].heading = 'Messages';
    this.memberTabs.tabs[tabId].active = true;
  }

  onTabActivated(data: TabDirective){
    this.activeTab = data;
    if(this.activeTab.heading === 'Messages' && this.messages?.length === 0){
      this.messageService.createHubConnection(this.user, this.member.userName);
    }else{
      this.messageService.stopHubConnection();
    }
  }
}
