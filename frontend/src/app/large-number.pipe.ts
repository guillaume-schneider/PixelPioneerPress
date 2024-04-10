import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'largeNumber' })
export class LargeNumberPipe implements PipeTransform {
  transform(value: number): string | null {
    if (isNaN(value) || value === null) {
      return 'null';
    }

    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
