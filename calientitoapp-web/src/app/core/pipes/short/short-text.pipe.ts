import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortText'
})
export class ShortTextPipe implements PipeTransform {
  
  transform(text: string, maxLength: number = 10): string {
    if (text.length <= maxLength)
      return text;
    else {
      return text.slice(0, maxLength) + '...';
    }
  }
}
