
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})

export class FilterPipe implements PipeTransform {

  result: any[];
  transform(data: any[], str: string = '') {
    this.result = data.filter(e => e.name.toLowerCase().indexOf(str.toLowerCase()) > -1)
      return this.result
  }

}
