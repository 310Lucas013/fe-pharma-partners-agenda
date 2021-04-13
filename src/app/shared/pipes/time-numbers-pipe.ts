import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'timeNumbers'})
export class TimeNumbersPipe implements PipeTransform {
  transform(n: string) {
    if (n !== undefined && n !== null) {
      let hours = n.split(':')[0]
      let min = n.split(':')[1]
      let result = "";
      if (hours.length === 1) {
        hours = '0' + hours;
      }
      if (min.length === 1) {
        min = '0' + min;
      }
      return  hours + ":" + min;
    } else {
      return "";
    }
  }
}
