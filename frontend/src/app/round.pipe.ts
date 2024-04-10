import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'round' })
export class RoundPipe implements PipeTransform {
  transform(value: number): number | null {
    if (isNaN(value) || value === null) {
      return null;
    }

    // Arrondi du nombre
    return Math.round(value);
  }
}
