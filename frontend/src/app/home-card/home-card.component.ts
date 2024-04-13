import { Component, Input, OnInit } from '@angular/core';
import { trigger, style, animate, transition, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.css'],
})
export class HomeCardComponent implements OnInit {
  @Input() animationDelay: string = '0s';
  @Input() image: string = '';

  ngOnInit(): void {
  }
}
