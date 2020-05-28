import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetComponent } from './pet.component';
import { PetFormComponent } from './pet-form/pet-form.component';
import { ControlComponent } from './control/control.component';

const routes: Routes = [
  {
    path: 'control',
    component: ControlComponent
  },
  {
    path: 'form',
    component: PetFormComponent
  },
  {
    path: 'form/:id',
    component: PetFormComponent
  },
  {
    path: ':id',
    component: PetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetRoutingModule { }
