import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private baseUrl = 'https://localhost:3000/wishlist';

  constructor(private http: HttpClient) { }

  addToWishlist(userId: string, gameId: string): Observable<any> {
    console.log('userId', userId);
    const status = this.http.post(`${this.baseUrl}/${userId}`, { gameId })
    console.log('status', status);
    return this.http.post(`${this.baseUrl}/${userId}`, { gameId });
  }

  removeFromWishlist(userId: string, gameId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${userId}/${gameId}`);
  }

  getWishlist(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}`);
  }
}
