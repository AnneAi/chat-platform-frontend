import { Component } from '@angular/core';

import { TokenManager } from '../../services/token-manager.service';

@Component({
  selector: 'teacher-space',
  templateUrl: './teacher-space.component.html',
  styleUrls: [ './teacher-space.component.scss' ],
  providers: [ TokenManager ]
})
export class TeacherSpaceComponent {

  private connected: boolean = this.tokenManager.doesTokenExist();
  private name: string;
  private roomId: string;

  constructor(private tokenManager: TokenManager) { }
}
