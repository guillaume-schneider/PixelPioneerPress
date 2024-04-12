// text-animation.directive.ts

import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appTextAnimation]'
})
export class TextAnimationDirective {
  @HostBinding('style.transition') transition = 'color 0.3s ease-in-out'; // Transition CSS pour la couleur du texte

  constructor() { }

  @HostListener('mouseenter') onMouseEnter() {
    this.changeColor('#007bff'); // Change la couleur du texte lors du survol
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.changeColor(''); // Rétablit la couleur initiale du texte lors du survol
  }

  private changeColor(color: string) {
    this.transition = `color 0.3s ease-in-out, background-color 0.3s ease-in-out`;
    document.querySelectorAll<HTMLElement>('.text-animation').forEach((element: HTMLElement) => {
      element.style.color = color;
    });
  }
}
