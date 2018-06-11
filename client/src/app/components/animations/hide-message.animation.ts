import { animate, query, style, transition, trigger, keyframes } from '@angular/animations';

export function hideMessage() { // TODO: doest work
  return trigger('hideMessage', [
    transition(':leave', [
      query('app-message', style({ opacity: 1 })),
      query('app-message', animate('2000ms  cubic-bezier(0.87, 0.59, 1, 1)', style({ opacity: 0 }))),
    ])
  ]);
}
