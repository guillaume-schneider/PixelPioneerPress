import { Injectable } from '@angular/core';
import { GameService } from './game.service';
import { Game } from 'src/models/Game';

@Injectable({
  providedIn: 'root'
})
export class GameSelectionService {
  private readonly STORAGE_KEY_PREFIX = 'selectedGames_';
  selectedGames: Game[] = [];
  private readonly LAST_UPDATE_KEY_PREFIX = 'lastUpdate_';
  private readonly UPDATE_INTERVAL = 24 * 60 * 60 * 1000; // 24 heures en millisecondes

  constructor(private gameService: GameService) {}

  loadGamesForUser(userId: string): void {
    const storageKey = this.STORAGE_KEY_PREFIX + userId;
    const lastUpdateKey = this.LAST_UPDATE_KEY_PREFIX + userId;

    const lastUpdate = localStorage.getItem(lastUpdateKey);
    const now = Date.now();


    if (!lastUpdate || now - Number(lastUpdate) >= this.UPDATE_INTERVAL) {
      this.selectRandomGames(userId, storageKey, lastUpdateKey);
    } else {
      const selectedGamesJson = localStorage.getItem(storageKey);
      if (selectedGamesJson) {
        this.selectedGames = JSON.parse(selectedGamesJson);
      }
    }
  }

  private selectRandomGames(userId: string, storageKey: string, lastUpdateKey: string): void {
    this.gameService.getGames().subscribe((games: Game[]) => {
      const selected: Game[] = [];
      const copy = [...games];
      console.log('copy', copy);

      for (let i = 0; i < 4; i++) {
        const index = Math.floor(Math.random() * copy.length);
        selected.push(copy.splice(index, 1)[0]);
      }

      localStorage.setItem(storageKey, JSON.stringify(selected));
      localStorage.setItem(lastUpdateKey, Date.now().toString());

      this.selectedGames = selected;
    });
  }
}
