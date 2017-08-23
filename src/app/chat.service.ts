import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class ChatService {
  private url: string = 'http://localhost:3000';
  private socket;
  
  constructor() { }

  sendMessage(message){
    this.socket.emit('add-message',message);
  }

  leave(){
    this.socket.emit('leave');
  }

  focus(){
    this.socket.emit('focus');
  }

  getMessages(){
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('message',(data)=>{
        observer.next(data);
      });

      return ()=>{
        this.socket.disconnect();
      }
    });

    return observable;
  }
}
