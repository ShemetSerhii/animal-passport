import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ApiUrl } from './apiUrl';
import { MedicalForm, Pet, PetForm, PetInfo, MedicalOperation, UserInfo } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  constructor(private http: HttpClient) { }

  fetchPets(): Observable<Pet[]> {
    const userId = localStorage.getItem('ownerId');

    return this.http.get<Pet[]>(`${ApiUrl}/Animal/${userId}/animals`);
  }

  fetchPet(petId: string): Observable<PetInfo> {
    return this.http.get<PetInfo>(`${ApiUrl}/Animal/${petId}`);
  }

  fetchPetMedRows(petId: string): Observable<MedicalOperation[]> {
    return this.http.get<MedicalOperation[]>(`${ApiUrl}/Medical/${petId}`);
  }

  savePet(pet: PetForm): Observable<string> {
    const userId = localStorage.getItem('ownerId');

    return this.http.post<string>(`${ApiUrl}/Animal/${userId}`, pet);
  }

  updatePet(petId: string, pet: PetForm): Observable<void> {
    return this.http.put<void>(`${ApiUrl}/Animal/${petId}`, pet);
  }

  savePetPicture(petId: string, picture: File): Observable<void> {
    const formData = new FormData();
    formData.append('picture', picture);

    return this.http.post<void>(`${ApiUrl}/Animal/${petId}/picture`, formData);
  }

  saveMedicalOperation(petId: string, medForm: MedicalForm): Observable<string> {
    return this.http.post<string>(`${ApiUrl}/Medical/${petId}`, medForm);
  }

  updateMedicalOperation(medicalId: string, medForm: MedicalForm): Observable<void> {
    return this.http.put<void>(`${ApiUrl}/Medical/${medicalId}`, medForm);
  }

  fetchPetOwners(): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>(`${ApiUrl}/User/Users`);
  }
}
