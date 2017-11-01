import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import Utils from '../../utils';
import { environment } from '../../../environments/environment';
import { TokenManager } from '../../services/token-manager.service';

@Component({
  selector: 'student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.scss'],
  providers: [ TokenManager ]
})
export class StudentLoginComponent {

  private name: string;
  private roomId: string;
  private serverMsg: string = ''; // Message received from the server
  private roomIdPatrn = /^([A-Z]|[a-z]|[0-9]|-|_|\s)+$/; // Regex for uppercase validation

  @Input() private connected: boolean;

  @Output() private connectedChange: EventEmitter<boolean> = new EventEmitter();

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
          this.connectedChange.emit(true);
        } else {
          this.serverMsg = data['message'];
        }
      },
      err => { }
    );
  }
}
