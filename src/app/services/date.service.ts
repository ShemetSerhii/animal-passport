import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private regExp = new RegExp(/^\+?0*/);

  private month = 30*24*60*60*100;

  public toISODate(inputDate: Date): string {
    if (inputDate === undefined || inputDate === null) {
      return null;
    }

    const date = new Date(inputDate);
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

    return date.toISOString().split('T')[0].replace(this.regExp, '');
  }

  public getDelta(inputDate: Date): string {
    const delta = new Date(Date.now()).getTime() - new Date(inputDate).getTime();
    const date = new Date(delta);

    console.log(delta / this.month);

    return date.getFullYear() < 1 ? `${date.getMonth()} Місяців` : `${date.getFullYear()} Років та ${date.getMonth()} Місяців`;
  }
}
