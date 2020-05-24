import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { PetForm, PetInfo } from 'src/app/models';
import { PetsService, DateService } from 'src/app/services';

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.css']
})
export class PetFormComponent implements OnInit {
  petId: string;

  formSubmitted = false;

  picture: File;
  picturePreviewUrl: any;

  isdeletedPicture = false;

  petForm = new FormGroup({
    name: new FormControl(''),
    kind: new FormControl(''),
    dateOfBirth: new FormControl('')
  });

  constructor(
    private petsService: PetsService,
    private dateService: DateService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.petId = this.route.snapshot.params.id;

    if (this.petId) {
      this.petsService.fetchPet(this.petId).subscribe((pet: PetInfo) => {
        this.petForm.controls.name.setValue(pet.name);
        this.petForm.controls.kind.setValue(pet.kind);
        this.petForm.controls.dateOfBirth.setValue(this.dateService.toISODate(pet.dateOfBirth));
        this.picturePreviewUrl = this.formatPicture(pet.picture);
      });
    }
  }

  deletePicture(): void {
    this.picture = null;
    this.picturePreviewUrl = null;
    this.isdeletedPicture = true;
  }

  fileProgress(fileInput: any): void {
    this.picture = fileInput.target.files[0] as File;
    this.preview();
  }

  preview(): void {
    const mimeType = this.picture.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.picture);
    reader.onload = (event) => {
      this.picturePreviewUrl = reader.result;
    };
  }

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.petForm.valid) {
      const pet = new PetForm();
      pet.name = this.petForm.value.name;
      pet.kind = this.petForm.value.kind;
      pet.dateOfBirth = this.petForm.value.dateOfBirth;

      if (this.petId) {
        this.petsService.updatePet(this.petId, pet)
          .subscribe(() => {
            if (this.picture) {
              this.petsService.savePetPicture(this.petId, this.picture).subscribe(() => this.router.navigate([`./pet/${this.petId}`]));
            } else {
              this.router.navigate([`./pet/${this.petId}`]);
            }
          });
      } else {
        this.petsService.savePet(pet)
          .subscribe((id: string) => {
            if (this.picture) {
              this.petsService.savePetPicture(id, this.picture).subscribe(() => this.router.navigate([`./pet/${id}`]));
            } else {
              this.router.navigate([`./pet/${id}`]);
            }
          });
      }
    }
  }

  formatPicture(byteArray: Uint8Array): string {
    return 'data:image/png;base64,' + byteArray.toString();
  }
}
