 import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Member } from 'src/app/_models/member';
import { Message } from 'src/app/_models/Message';
 import { MembersService } from 'src/app/_services/members.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  @ViewChild("memberTabs", {static: true}) memberTabs: TabsetComponent;

  member!: Member;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];
  activeTab: TabDirective;
  messages: Message[] = [];

  constructor(private memberServie: MembersService, private route: ActivatedRoute, private messageService: MessageService) { }

  
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
      this.loadMessages();
    }
  }
}
