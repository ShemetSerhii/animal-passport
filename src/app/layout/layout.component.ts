import { Component } from '@angular/core';

import { AuthService } from '../services';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  constructor(public authService: AuthService) { }
}
