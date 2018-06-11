import { animate, query, style, transition, trigger, keyframes } from '@angular/animations';

export function showMessage() {
  return trigger('showMessage', [
    transition(':enter', [
      query('.messageContainer, .avatar', style({ opacity: 0 })),
      query('.messageContainer, .avatar', animate('200ms cubic-bezier(0.87, 0.59, 1, 1)', style({ opacity: 1 }),
      )),
    ])
  ]);
}
