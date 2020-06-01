import { Component, OnInit} from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { SignalRService, AuthService } from 'src/app/services';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

  constructor(
    private signalR: SignalRService,
    private authService: AuthService,
    public translate: TranslateService) { }

  ngOnInit(): void {
    if (this.authService.IsController) {
      this.signalR.login();
    }
  }
}
