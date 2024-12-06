import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDoc, updateDoc, arrayUnion, arrayRemove, getDocs, setDoc } from '@angular/fire/firestore';
import { Observable, from, map, switchMap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private collectionName = 'wishlist';

  constructor(private firestore: Firestore) {}

  addToWishlist(userId: string, gameId: string): Observable<void> {
    const userDocRef = doc(this.firestore, `${this.collectionName}/${userId}`);

    // Check if the document exists, create it if not, then update
    return from(getDoc(userDocRef)).pipe(
      map((docSnap) => {
        if (!docSnap.exists()) {
          // Create the document with an empty gameIds array if it doesn't exist
          return setDoc(userDocRef, { gameIds: [] });
        }
        return null;
      }),
      switchMap(() =>
        updateDoc(userDocRef, { gameIds: arrayUnion(gameId) })
      )
    );
  }

  removeFromWishlist(userId: string, gameId: string): Observable<void> {
    const userDocRef = doc(this.firestore, `${this.collectionName}/${userId}`);

    // Check if the document exists
    return from(getDoc(userDocRef)).pipe(
      map((docSnap) => {
        if (!docSnap.exists()) {
          throw new Error('Document does not exist.');
        }
        return null;
      }),
      switchMap(() =>
        updateDoc(userDocRef, { gameIds: arrayRemove(gameId) })
      )
    );
  }

  getWishlist(): Observable<any> {
    const wishlistRef = collection(this.firestore, this.collectionName);
    return from(getDocs(wishlistRef)).pipe(
      map((snapshot: any) => snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() })))
    );
  }

  getWishlistByUser(userId: string): Observable<any[]> {
    const userDocRef = doc(this.firestore, `${this.collectionName}/${userId}`);
    return from(getDoc(userDocRef)).pipe(
      map((docSnap: any) => docSnap.exists() ? docSnap.data().gameIds : [])
    );
  }
}
