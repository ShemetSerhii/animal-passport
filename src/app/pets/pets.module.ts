import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PetsComponent } from './pets.component';
import { PetsRoutingModule } from './pets-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [PetsComponent],
  imports: [
    CommonModule,
    PetsRoutingModule,
    TranslateModule
  ],
  exports: [
    PetsComponent
  ]
})
export class PetsModule { }
