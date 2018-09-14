import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash'

@Pipe({
    name: 'orderBy', pure: false
  })

  export class OrderBy implements PipeTransform {
    
    transform(array: Array<any>, args?: any, order?:any): any {
        if(order=='-'){
            return _.sortBy(array, [args]).reverse();

        }
        else{
            return _.sortBy(array, [args]);

        }
    }
    
}