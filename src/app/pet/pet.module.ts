import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';

import { PetComponent } from './pet.component';
import { PetRoutingModule } from './pet-routing.module';
import { PetFormComponent } from './pet-form/pet-form.component';
import { MedModalComponent } from './med-modal/med-modal.component';

@NgModule({
  declarations: [
    PetComponent,
    PetFormComponent,
    MedModalComponent
  ],
  imports: [
    CommonModule,
    PetRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CollapseModule.forRoot(),
    ModalModule.forRoot()
  ],
  entryComponents: [
    MedModalComponent
  ]
})
export class PetModule { }
