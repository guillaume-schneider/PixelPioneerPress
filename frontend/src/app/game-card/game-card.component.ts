import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent implements OnInit {

  @Input() game: any; // Entrée pour les données du jeu

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  goToGameDetails() {
    this.router.navigate(['/game', this.game.id]);
  }

}
