import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Game } from '../models/Game'; // Importez l'interface Game

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = 'http://127.0.0.1:5000/steam';

  constructor(private http: HttpClient) { }

  getGames(): Observable<Game[]> {
    return this.http.get<any>(`${this.apiUrl}/games`).pipe(
      map(response => {
        if (response && response.games && Array.isArray(response.games)) {
          // Map the response to Game objects
          return response.games.map((game: any) => ({
            id: game.id,
            title: game.title,
            developer: game.developer,
            genres: game.genres.split(',').map((genre: string) => genre.trim()), // Split genres string into array
            description: game.description,
            image: game.image,
            linux_requirement: game.linux_requirement,
            mac_requirement: game.mac_requirement,
            negative_rating: game.negative_rating,
            pc_requirement: game.pc_requirement,
            positive_rating: game.positive_rating,
            publisher: game.publisher,
            release_date: game.release_date,
            short_description: game.short_description
          }));
        } else {
          console.error('Invalid data format: expected array under "games" property');
          return []; // Return an empty array if the data is not in the expected format
        }
      })
    );
  }

  getGameById(id: number): Observable<Game> {
    const url = `${this.apiUrl}/game/${id}`;
    return this.http.get<any>(url).pipe(
      map(game => ({
        id: game.id,
        title: game.title,
        developer: game.developer,
        genres: game.genres.split(',').map((genre: string) => genre.trim()), // Split genres string into array
        description: game.description,
        image: game.image,
        linux_requirement: game.linux_requirement,
        mac_requirement: game.mac_requirement,
        negative_rating: game.negative_rating,
        pc_requirement: game.pc_requirement,
        positive_rating: game.positive_rating,
        publisher: game.publisher,
        release_date: game.release_date,
        short_description: game.short_description
      }))
    );
  }
}
