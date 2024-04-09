import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PixelPioneerPress';

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    const footerHeight = this.el.nativeElement.querySelector('.footer').offsetHeight;
    this.renderer.setStyle(this.el.nativeElement.querySelector('.content'), 'padding-bottom', footerHeight + 'px');
  }

}
