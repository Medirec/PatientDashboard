
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'filter',
  pure: false
})

export class FilterPipe implements PipeTransform {

  result: any[];
  transform(data: any[], str: string = '') {
    debugger

    this.result = data.filter(e => {
      if(e.name){
      return  e.name.toLowerCase().indexOf(str.toLowerCase()) > -1

      }
      else if(e.date){
       return e.date.indexOf(str) > -1
      }
    })
      return this.result
  }

}
