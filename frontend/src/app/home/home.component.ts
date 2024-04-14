import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/Game';
import { GameSelectionService } from '../game-selection.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        query('.image-card', [
          style({ transform: 'translateY(200px)', opacity: 0 }),
          stagger(800, [
            animate('1.4s ease', style({ transform: 'translateY(0)', opacity: 1 }))
          ])
        ])
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  selectedGames: Game[] = [];
  visitedToday: boolean = false;

  constructor(private gameSelectionService: GameSelectionService,
    private authService: AuthService
  ) { }

  async ngOnInit(): Promise<void> {
    const user = await this.authService.getCurrentUser();
    const userId = user?.uid ?? '';
    this.gameSelectionService.loadGamesForUser(userId);
    this.selectedGames = this.gameSelectionService.selectedGames;
    console.log('selectedGames', this.selectedGames);

    this.selectedGames = this.gameSelectionService.selectedGames;
  }

}
