import { Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { AuthService } from '../services';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  constructor(
    public translate: TranslateService,
    public authService: AuthService) { }

  public get lang(): string {
    return this.translate.currentLang.toLocaleUpperCase();
  }

  onClick(lang: string): void {
    this.translate.use(lang);
  }
}
