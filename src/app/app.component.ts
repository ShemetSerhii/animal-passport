import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { SignalRService, AuthService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'pet-passport';

  constructor(
    private translate: TranslateService,
    private signalRService: SignalRService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.translate.addLangs(['en', 'ua']);
    this.translate.setDefaultLang('ua');
    this.translate.use('ua');

    this.signalRService.startConnection();
    this.signalRService.resiveId.subscribe(
      (id) => {
        console.log(id);
        if (this.authService.IsController) {
          this.router.navigate([`/pet/${id}`]).then(() => {
            window.location.reload();
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.signalRService.resiveId.unsubscribe();
  }
}
