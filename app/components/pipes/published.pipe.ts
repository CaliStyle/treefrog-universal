import { Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'published'
})
export class PublishedPipe implements PipeTransform {
    transform(items: any[], args: any[]): any {
        // filter items array, items which match and return true will be kept, false will be filtered out
        return items.filter(item => {
          let published = true;
          // console.log(item.meta)
          if (item.meta) {
            if (typeof item.meta.published !== 'undefined') {
              // console.log(item)
              if (item.meta.published !== true) {
                  published = false;
              }
            }
          }
          return published;
        })
    }
}
