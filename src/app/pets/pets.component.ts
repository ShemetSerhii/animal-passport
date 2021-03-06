import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { Pet } from '../models/pet';
import { PetsService, AuthService } from '../services';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {
  pets: Pet[];

  constructor(
    private petService: PetsService,
    private router: Router,
    public authService: AuthService,
    public translate: TranslateService) { }

  ngOnInit(): void {
    if (this.authService.IsController) {
      this.router.navigate(['/pet/control']);
    }
    this.petService.fetchPets().subscribe((data: Pet[]) => this.pets = data);
  }

  onPetClick(pet: Pet): void {
    this.router.navigate([`/pet/${pet.id}`]);
  }

  formatPicture(byteArray: Uint8Array): string {
    return 'data:image/png;base64,' + byteArray.toString();
  }
}
