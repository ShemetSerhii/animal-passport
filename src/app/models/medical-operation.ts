import { Attachment } from './attachments';

export class MedicalOperation {
  constructor(
    public id: string,
    public name: string,
    public date: Date,
    public dateExpiry: Date,
    public attachments: Attachment[]
  ) {
    this.isCollapsed = false;
  }

  isCollapsed: boolean;
}
