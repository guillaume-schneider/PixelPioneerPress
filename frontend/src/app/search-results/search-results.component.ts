import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Game } from 'src/models/Game';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  games: Game[] = [];
  searchText: string = '';

  constructor(private gameService: GameService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchText = params['query'];
      this.searchGames();
    });
  }

  searchGames() {
    if (this.searchText) {
      this.gameService.searchGames(this.searchText).subscribe(games => {
        this.games = games;
      });
    }
  }
}
