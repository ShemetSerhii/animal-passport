import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Observable, forkJoin } from 'rxjs';
import { defaultIfEmpty } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TranslateService } from '@ngx-translate/core';

import { MedicalForm, MedicalOperation, Attachment } from 'src/app/models';
import { PetsService, DateService, AttachmentService } from 'src/app/services';

@Component({
  selector: 'app-med-modal',
  templateUrl: './med-modal.component.html',
  styleUrls: ['./med-modal.component.css']
})
export class MedModalComponent implements OnInit {
  @Output() isformSubmitted = new EventEmitter<any>();

  petId: string;
  medicalOperation: MedicalOperation;

  formSubmitted = false;

  medOpForm = new FormGroup({
    name: new FormControl(''),
    date: new FormControl(''),
  });

  files: File[] = [];
  existedFiles: Attachment[] = [];

  constructor(
    public modalRef: BsModalRef,
    public dateService: DateService,
    public translate: TranslateService,
    private petsService: PetsService,
    private attachmentService: AttachmentService) { }

  ngOnInit(): void {
    if (this.medicalOperation) {
      this.medOpForm.controls.name.setValue(this.medicalOperation.name);
      this.medOpForm.controls.date.setValue(this.dateService.toISODate(this.medicalOperation.dateExpiry));

      this.existedFiles = this.medicalOperation.attachments;
    }
  }

  saveFile(files: File[]): void {
    for (const file of files) {
      this.files.push(file);
    }
  }

  deleteFile(index: number): void {
    this.files.splice(index, 1);
  }

  submitForm(): void {
    this.formSubmitted = true;

    if (this.medOpForm.valid) {
      const medForm = new MedicalForm();
      medForm.name = this.medOpForm.value.name;
      medForm.dateExpiry = this.medOpForm.value.date;

      if (this.medicalOperation) {
        this.petsService.updateMedicalOperation(this.medicalOperation.id, medForm).subscribe(
          () => {
            this.uploadFile(this.medicalOperation.id)
              .subscribe(() => {
                this.modalRef.hide();
                this.isformSubmitted.emit();
              });
          }
        );
      } else {
        this.petsService.saveMedicalOperation(this.petId, medForm)
          .subscribe((id: string) => {
            this.uploadFile(id)
              .subscribe(() => {
                this.modalRef.hide();
                this.isformSubmitted.emit();
              });
          });
      }
    }
  }

  uploadFile(medicalId: string): Observable<void> {
    const tasks = [];
    this.files.forEach(file => {
      tasks.push(this.attachmentService.uploadAttachment(medicalId, file));
    });

    return forkJoin(tasks).pipe(defaultIfEmpty(null));
  }
}
