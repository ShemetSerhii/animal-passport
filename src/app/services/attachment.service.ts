import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { saveAs } from 'file-saver';

import { Attachment } from '../models';
import { ApiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {

  constructor(private http: HttpClient) { }

  uploadAttachment(medicalRowId: string, attachment: File): Observable<void> {
    const formData = new FormData();
    formData.append('attachment', attachment);

    return this.http.post<void>(`${ApiUrl}/Attachment/${medicalRowId}`, formData);
  }

  downloadAttachment(attachment: Attachment): Observable<void> {
    return this.http
    .get(`${ApiUrl}/Attachment/${attachment.id}`, { responseType: 'blob' })
    .pipe(map((blob: Blob) => saveAs(blob, attachment.fileName)));
  }

  deleteAttachment(attachment: Attachment): Observable<void> {
    return this.http.delete<void>(`${ApiUrl}/Attachment/${attachment.id}`);
  }
}
