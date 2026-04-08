import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fallback',
  standalone: false
})
export class FallbackPipe implements PipeTransform {
  transform(value: string | number | null | undefined, fallbackText = 'Unknown'): string | number {
    if (value === null || value === undefined || value === '') {
      return fallbackText;
    }
    return value;
  }
}
