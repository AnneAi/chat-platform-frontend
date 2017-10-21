import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import Utils from '../../utils';
import { environment } from '../../../environments/environment';
import { TokenManager } from '../../services/token-manager.service';

@Component({
  selector: 'student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.scss']
})
export class StudentLoginComponent {

  @Input() private name: string;
  @Input() private roomId: string;
  @Input() private connected: boolean;
  @Output() private nameChange: EventEmitter<string> = new EventEmitter();
  @Output() private roomIdChange: EventEmitter<string> = new EventEmitter();
  @Output() private connectedChange: EventEmitter<boolean> = new EventEmitter();

  private serverMsg: string = ''; // Message received from the server
  private namePatrn = /^([A-Z]([A-Z]|[a-z])*\s?)+$/; // Regex for name validation
  private roomIdPatrn = /^([A-Z]|[a-z]|[0-9]|-|_)+$/; // Regex for uppercase validation

  constructor(private http: HttpClient, private tokenManager: TokenManager) { }

  joinSession(): void {
    this.serverMsg = '';

    if (Utils.isEmpty(this.name) || Utils.isEmpty(this.roomId)) {
      return;
    }

    let body = {
      roomName: this.roomId,
      userName: this.name
    };

    this.http.post(`${environment.api}/rooms/connect/student`, body).subscribe(
      (data: any) => {
        if(data.success) {
          this.tokenManager.storeToken(data.token);

          this.nameChange.emit(this.name);
          this.roomIdChange.emit(this.roomId);
          this.connectedChange.emit(true);
        } else {
          this.serverMsg = data['message'];
        }
      },
      err => { }
    );
  }
}
