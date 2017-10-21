import { Component } from '@angular/core';

import { TokenManager } from './services/token-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ TokenManager ]
})
export class AppComponent {

  constructor() { }
}
