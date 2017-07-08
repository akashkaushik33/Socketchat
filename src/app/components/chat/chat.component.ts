import { Component, OnInit ,OnDestroy } from '@angular/core';
import { ChatService } from "../../services/chat.service";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit , OnDestroy {
  messages : any = [];
  message : string;
  connection : any;
  username : string;
  alert : any = false;

  constructor(private _chatService : ChatService) { }


  ngOnInit() {

    this.username = this._chatService.getUsername();
    this.connection = this._chatService.getMessages().subscribe(
      message => {
        console.log(message);
        this.messages.push(message);
      }
    );
  }

  ngOnDestroy(){
    this.connection.unsubscribe();

  }

  setUsername(){
    this._chatService.setUsername(this.username);
    this.alert = 'Username is set';
  }

  sendMessage(){
    this._chatService.sendMessage(this.message , this.username);
    this.message = '';
  }

}
