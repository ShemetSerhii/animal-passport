import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PetsComponent } from './pets.component';
import { PetsRoutingModule } from './pets-routing.module';

@NgModule({
  declarations: [PetsComponent],
  imports: [
    CommonModule,
    PetsRoutingModule
  ],
  exports: [
    PetsComponent
  ]
})
export class PetsModule { }
