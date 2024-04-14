import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../game.service';
import { Game } from 'src/models/Game';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  gameId: number | undefined;
  game: Game | null = null; // Initialize game as null to handle undefined state

  constructor(private route: ActivatedRoute, private gameService: GameService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.gameId = params['id'];
      if (this.gameId)
        this.loadGameDetails(this.gameId);
    });
  }

  loading: boolean = true;

  loadGameDetails(id: number) {
    this.loading = true;
    this.gameService.getGameById(id).subscribe({
      next: (game) => {
        this.game = game;
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to load game details:', error);
        this.loading = false;
      }
    });
  }
}
