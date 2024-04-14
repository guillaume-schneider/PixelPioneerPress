import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GameService } from '../game.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {

  games: any[] = [];
  safeDescriptions: SafeHtml[] = [];
  showDescription: boolean = false;

  constructor(private gameService: GameService, private sanitizer: DomSanitizer) { }



  ngOnInit(): void {
    this.getGames();
  }

  getGames() {
    this.gameService.getGames().subscribe({
      next: (games) => {
        console.log('Jeux récupérés : ', games);
        this.games = games;

        this.safeDescriptions = this.games.map(game => this.sanitizer.bypassSecurityTrustHtml(game.short_description));
      },
      error: (error) => {
        console.error('Une erreur s\'est produite : ', error);
      }
    });
  }

}
