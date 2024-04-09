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
  game!: Game;

  constructor(private route: ActivatedRoute, private gameService: GameService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.gameId = params['id'];
      if (this.gameId)
        this.loadGameDetails(this.gameId);
    });
  }

  loadGameDetails(id: number) {
    this.gameService.getGameById(id).subscribe(game => {
      this.game = game;
    });
  }
}
