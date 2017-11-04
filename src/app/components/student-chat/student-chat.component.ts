import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { WebsocketService } from '../../services/websocket.service';
import { TokenManagerService } from '../../services/token-manager.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'student-chat',
  templateUrl: './student-chat.component.html',
  styleUrls: [ './student-chat.component.scss' ],
  providers: [ WebsocketService ]
})
export class StudentChatComponent implements OnInit, OnDestroy {

  private connection;
  private id: string;
  private isEmitterTyping: boolean = false;
  private messages = [ ];

  constructor(
    private websocket: WebsocketService,
    private tokenManager: TokenManagerService,
    private auth: AuthenticationService,
    private router: Router
  ) {
    this.websocket.connect();
  }

  ngOnInit() {
    this.connection = this.websocket.addListener('init').subscribe((data: any) => {
      this.id = data.id;
    });

    this.connection = this.websocket.addListener('message').subscribe((data: any) => {
      this.messages.push(data);
    });

    this.connection = this.websocket.addListener('typing-on').subscribe((data: any) => {
      this.isEmitterTyping = true;
    });

    this.connection = this.websocket.addListener('typing-off').subscribe((data: any) => {
      this.isEmitterTyping = false;
    });

    let msg = {
      token: this.tokenManager.retrieveToken()
    };

    this.websocket.send('init', msg);
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
    this.websocket.disconnect();
  }

  /*  Disconnect the user from the room.

      PARAMS
        none

      RETURN
        none
  */
  private disconnect(): void {
    this.auth.disconnectStudent();
  }
}
