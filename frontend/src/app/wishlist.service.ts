import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, switchMap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private baseUrl = 'http://localhost:3000/wishlist';

  constructor(
    private http: HttpClient
  ) { }

  addToWishlist(userId: string, gameId: string): Observable<any> {
    return this.getWishlist().pipe(
      map((wishlist: any) => {
        wishlist[userId] = wishlist[userId] || [];
        wishlist[userId].push(gameId);
        return wishlist;
      }),
      switchMap(updatedWishlist => this.http.put(this.baseUrl, updatedWishlist))
    );
  }

  removeFromWishlist(userId: string, gameId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${userId}/${gameId}`);
  }

  getWishlist(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getWishlistByUser(userId: string): Observable<any> {
    return this.getWishlist().pipe(
      map((wishlist: any) => wishlist[userId] || [])
    );
  }
}
