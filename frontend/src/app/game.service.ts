import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Game } from '../models/Game'; // Importez l'interface Game

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = 'http://127.0.0.1:5000/steam';

  constructor(private http: HttpClient) { }

  getGames(): Observable<Game[]> {
    return this.http.get<any>(`${this.apiUrl}/games`).pipe(
      map(response => this.mapGames(response)),
      catchError(error => {
        console.error('Error fetching games:', error);
        return of([]);
      })
    );
  }

  searchGames(searchText: string): Observable<Game[]> {
    if (!searchText.trim()) {
      // if not search term, return empty game array.
      return of([]);
    }
    return this.getGames().pipe(
      map(games => games.filter(game => game.title.toLowerCase().includes(searchText.toLowerCase())))
    );
  }

  getGameById(id: number): Observable<Game> {
    const url = `${this.apiUrl}/game/${id}`;
    return this.http.get<any>(url).pipe(
        map(response => {
          let res = response ? this.mapSingleGame(response) : this.getEmptyGame();
          return res;
        }),
        catchError(error => {
            console.error('Error fetching game by ID:', error);
            return of(this.getEmptyGame()); // Return a default/empty game object in case of error
        })
    );
}


  private mapGames(response: any): Game[] {
    if (response && response.games && Array.isArray(response.games)) {
      return response.games.map(this.mapSingleGame);
    } else {
      console.error('Invalid data format: expected array under "games" property');
      return [];
    }
  }

  private mapSingleGame(game: any): Game {
    return {
      id: game.id,
      title: game.title,
      developer: game.developer,
      genres: game.genres.split(',').map((genre: string) => genre.trim()),
      description: game.description,
      image: game.image,
      video: game.video,
      linux_requirement: game.linux_requirement,
      mac_requirement: game.mac_requirement,
      negative_rating: game.negative_rating,
      pc_requirement: game.pc_requirement,
      positive_rating: game.positive_rating,
      publisher: game.publisher,
      release_date: game.release_date,
      short_description: game.short_description
    };
  }

  private getEmptyGame(): Game {
    return {
        id: 0,
        title: 'Unknown',
        developer: '',
        genres: [],
        description: '',
        image: '',
        video: '',
        linux_requirement: '',
        mac_requirement: '',
        negative_rating: 0,
        pc_requirement: '',
        positive_rating: 0,
        publisher: '',
        release_date: '',
        short_description: ''
    };
}
}
