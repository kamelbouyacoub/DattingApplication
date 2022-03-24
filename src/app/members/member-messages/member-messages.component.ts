 import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message } from 'src/app/_models/Message';
 import { MessageService } from 'src/app/_services/message.service';
 
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() userName: string;
  messageContent: string;
  messages : Message[] = [];
  @ViewChild("messageForm") messageForm: NgForm;

  constructor(public messageService: MessageService) { }

  ngOnInit() {
    this.messageService!.messageThread$.subscribe((messages) => {
      console.log(messages);
      this.messages = messages;
    }) 
  }

  sendMessage(){
    this.messageService.sendMessage(this.userName, this.messageContent).then(() => {
      this.messageForm.reset();
    })
  }
}
