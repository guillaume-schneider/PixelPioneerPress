import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = 'http://127.0.0.1:5000/steam/games'

  constructor(private http: HttpClient) { }

  getGames(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => {
        if (response && response.games && Array.isArray(response.games)) {
          return response.games; // Return the games array if it exists under "games" property
        } else {
          console.error('Invalid data format: expected array under "games" property');
          return []; // Return an empty array if the data is not in the expected format
        }
      })
    );
  }
}
