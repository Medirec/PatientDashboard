
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})

export class FilterPipe implements PipeTransform {

  result: any[];
  transform(data: any[], str: string = '') {
    

    this.result = data.filter(e => {
      if(e.name){
      return  e.name.toLowerCase().indexOf(str.toLowerCase()) > -1

      }
      else if(e.date){
       return e.date.indexOf(str) > -1
      }
      else if(e.fullName){
        return  e.fullName.toLowerCase().indexOf(str.toLowerCase()) > -1
      }
    })
      return this.result
  }

}
