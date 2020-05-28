import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { SignalRService } from 'src/app/services';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit, OnDestroy {

  constructor(private signalRService: SignalRService, private router: Router) { }
  
  ngOnInit(): void {
    this.signalRService.startConnection();
    this.signalRService.resiveId.subscribe((id) => this.router.navigate([`/pet/${id}`]));
  }

  ngOnDestroy(): void {
    this.signalRService.resiveId.unsubscribe();
  }
}
