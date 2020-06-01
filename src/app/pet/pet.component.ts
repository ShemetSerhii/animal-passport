import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap/modal';
import { TranslateService } from '@ngx-translate/core';

import { PetsService, DateService, AttachmentService, AuthService } from '../services';
import { Attachment, PetInfo, MedicalOperation } from '../models';
import { MedModalComponent } from './med-modal/med-modal.component';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})
export class PetComponent implements OnInit {
  petId: string;
  pet: PetInfo;
  medicalOperations: MedicalOperation[] = [];

  now = Date.now();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private petsService: PetsService,
    private attachmentService: AttachmentService,
    private modalService: BsModalService,
    public dateService: DateService,
    public authService: AuthService,
    public translate: TranslateService) { }

  ngOnInit(): void {
    this.petId = this.route.snapshot.params.id;

    if (this.petId) {
      this.petsService.fetchPet(this.petId).subscribe((pet: PetInfo) => {
        this.pet = pet;
        this.fetchMedRows();
      });
    }
  }

  checkExpired(medRow: MedicalOperation): boolean {
    return medRow.dateExpiry && new Date(medRow.dateExpiry).getTime() <= this.now;
  }

  fetchMedRows(): void {
    this.petsService.fetchPetMedRows(this.petId)
      .subscribe((rows: MedicalOperation[]) => this.medicalOperations = rows);
  }

  deletePet(): void {
    this.petsService.deletePet(this.petId)
      .subscribe(() => this.router.navigate(['./pets']));
  }

  deleteMedRow(id: string): void {
    this.petsService.deleteMedicalOperation(id).subscribe(() => this.fetchMedRows());
  }

  formatPicture(byteArray: Uint8Array): string {
    return 'data:image/png;base64,' + byteArray.toString();
  }

  showEdit(): void {
    this.router.navigate([`pet/form/${this.petId}`]);
  }

  showEditMedical(operation: MedicalOperation): void {
    const initialState = {
      petId: this.petId,
      medicalOperation: operation
    };
    console.log(1);

    const modalRef = this.modalService.show(MedModalComponent, {
      initialState
    });

    modalRef.content.isformSubmitted.subscribe(() => this.fetchMedRows());
  }

  createMedicalOpetaion(): void {
    const initialState = { petId: this.petId };
    const modalRef = this.modalService.show(MedModalComponent, {
      initialState
    });

    modalRef.content.isformSubmitted.subscribe(() => this.fetchMedRows());
  }

  downloadAttachment(attachment: Attachment): void {
    this.attachmentService.downloadAttachment(attachment)
      .subscribe(() => console.log(`Attachment: ${attachment.fileName} saved`));
  }

  deleteAttachment(medicalId: string, attachment: Attachment): void {
    this.attachmentService.deleteAttachment(attachment).subscribe(() => {
      const medical = this.medicalOperations.find(x => x.id === medicalId);
      medical.attachments = medical.attachments.filter(x => x.id !== attachment.id);
    });
  }
}
