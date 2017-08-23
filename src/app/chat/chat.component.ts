import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import {ChatService} from '../chat.service';
import { FormControl } from '@angular/forms';

@Component({
  moduleId:module.id,
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService]
})
export class ChatComponent implements OnInit,OnDestroy {

  messages =  [];
  connection;
  message;
  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.connection = this.chatService.getMessages().subscribe(message => {
      this.messages.push(message);
    });
  }

  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.connection.unsubscribe();
  }

  sendMessage(){
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

  @HostListener('window:focus', ['$event'])
  handleFocusOn(event: Event){
    console.log('window focused',Date.now());
    this.chatService.focus();
  }

  @HostListener('window:blur', ['$event'])
  handleBlurt(event: Event){
    console.log('window left',Date.now());
    this.chatService.leave();
  }

}
