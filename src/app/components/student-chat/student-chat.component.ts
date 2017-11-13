import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';

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

  private id: string;
  private isEmitterTyping: boolean = false;
  private messages = [ ];
  private wordsPerMilliseconds: number = 260 / (60 * 1000);
  private MaxDelay: number = 5 * 1000;
  private defaultDelay: number = 1.5 * 1000;
  private delayBetweenMessages: number = 1.5 * 1000;

  private cssHeight: number;
  private debounceTime: number = 50;
  private resizeTimeout: number;

  constructor(
    private websocket: WebsocketService,
    private tokenManager: TokenManagerService,
    private auth: AuthenticationService
  ) {
    this.websocket.connect();
  }

  ngOnInit() {
    this.websocket.addListener('init').subscribe((data: any) => this.onInit(data));

    this.websocket.addListener('message').subscribe((data: any) => this.onMessage(data));

    this.websocket.addListener('typing-on').subscribe((data: any) => this.onTyping(true));

    this.websocket.addListener('typing-off').subscribe((data: any) => this.onTyping(false));

    let msg = {
      token: this.tokenManager.retrieveToken()
    };

    this.websocket.send('init', msg);
  }

  ngOnDestroy() {
    this.websocket.disconnect();
  }



  /******************************************
  /*
  /*      WEBSOCKET EVENTS
  /*
  /*****************************************/



  /*  Handle init event.

      PARAMS
        data (object): must contain
          id (string): id of the current user

      RETURN
        none
  */
  private onInit(data: any): void {

    this.id = data.id;

    // send an event to the agent to make it engage the conversation
    let msg = {
      type: 'event',
      payload: {
        event: 'engage_conversation'
      }
    };

    this.websocket.send('message', msg);
  }

  /*  Handle message event.

      PARAMS
        messages (array of objects)

      RETURN
        none
  */
  private onMessage(messages: any[ ]): void {

    if (messages[0].emitterType === 'agent') {
      this.simulateTyping(messages.reverse());
    } else {
      this.messages = this.messages.concat(messages);
    }
  }

  /*  Handle typing event.

      PARAMS
        state (boolean): state of the typing indicator

      RETURN
        none
  */
  private onTyping(state: boolean): void {

    this.isEmitterTyping = state;
  }



  /******************************************
  /*
  /*      TEMPLATE EVENTS
  /*
  /*****************************************/



  /*  Resize the size of the main container on window resize.

      PARAMS
        event (event object): event fired on window resize

      RETURN
        none
  */
  @HostListener('window:resize', [ '$event' ])
  private onWindowResize(event): void {
    // debounce resize, wait for resize to finish before doing stuff
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = setTimeout((() => {
      this.cssHeight = event.target.innerHeight;
    }).bind(this), this.debounceTime);
  }



  /******************************************
  /*
  /*      CORE
  /*
  /*****************************************/



  /*  Disconnect the user from the room.

      PARAMS
        none

      RETURN
        none
  */
  private disconnect(): void {
    this.auth.disconnectStudent();
  }

  /*  Simulate typing of a message stack.

      PARAMS
        messages (array of objects): stack of messages to add

      RETURN
        none
  */
  private simulateTyping(messages): void {
    if (messages.length > 0) {
      this.isEmitterTyping = true;

      let delay;
      let message = messages[messages.length - 1].message;
      if (message.type === 'text') {
        let nbWords = message.text.split(' ').length;
        delay = nbWords / this.wordsPerMilliseconds;
      }
      else {
        delay = this.defaultDelay;
      }

      if (delay > this.MaxDelay) {
        delay = this.MaxDelay;
      }

      setTimeout(() => {
        this.isEmitterTyping = false;
        this.messages.push(messages.pop());
        setTimeout(() => {
          this.simulateTyping(messages);
        }, this.delayBetweenMessages);
      }, delay);
    }
  }
}
