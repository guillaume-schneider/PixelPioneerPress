import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

export const staggerAnimation = trigger('cardAnimation', [
  transition(':enter', [
    style({ transform: 'translateY(200px)', opacity: 0 }),
    animate('{{ delay }}s ease', style({ transform: 'translateY(0)', opacity: 1 }))
  ], { params: { delay: '0' } })
]);
