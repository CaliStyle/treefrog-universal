// truncate.ts
import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, arg1?:string , arg2?:string) : string {

    let limit = arg1 ? parseInt(arg1, 10) : 10;
    let trail = arg2 ? arg2 : '...';
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}
