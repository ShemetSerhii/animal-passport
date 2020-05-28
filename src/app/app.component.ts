import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { SignalRService, AuthService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'animal-passport';

  constructor(
    private signalRService: SignalRService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.signalRService.startConnection();
    this.signalRService.resiveId.subscribe(
      (id) => {
        if (this.authService.IsController) {
          this.router.navigate([`/pet/${id}`]).then(() => {
            window.location.reload();
          })
        }
      });
  }

  ngOnDestroy(): void {
    this.signalRService.resiveId.unsubscribe();
  }
}
