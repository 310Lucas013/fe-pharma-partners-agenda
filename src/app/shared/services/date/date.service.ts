import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  convertTZ(date: any, tzString: string) {
    return new Date((typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', {timeZone: tzString}));
  }

  checkTimezones(date: Date): Date {
    date = this.convertTZ(date, Intl.DateTimeFormat().resolvedOptions().timeZone);
    let time = date.getTime();
    //Check if timezoneOffset is positive or negative
    if (date.getTimezoneOffset() <= 0) {
      //Convert timezoneOffset to hours and add to Date value in milliseconds
      let final = time + (Math.abs(date.getTimezoneOffset() * 60000));
      //Convert from milliseconds to date and convert date back to ISO string
      date = new Date(final);
    } else {
      let final = time + (-Math.abs(date.getTimezoneOffset() * 60000));
      date = new Date(final);
    }
    return date;
  }
}
