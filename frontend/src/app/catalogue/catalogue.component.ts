import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  games: any[] = [];
  safeDescriptions: SafeHtml[] = [];
  showDescription: boolean = false;

  constructor(private gameService: GameService, private sanitizer: DomSanitizer,
              private router: Router) { }

    

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
