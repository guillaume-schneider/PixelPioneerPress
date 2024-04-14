import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, of } from 'rxjs';
import { catchError, first, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  constructor(private db: AngularFireDatabase, private auth: AngularFireAuth) { }

  // Récupération de tous les utilisateurs
  getAllUsers() {
    return this.db.list('/users').valueChanges();
  }

  getFriends(userId: string): Observable<string[]> {
    return this.db.list<string>(`/users/${userId}/friends`).valueChanges();
  }

  addFriend(friendId: string): Observable<any> {
    return this.auth.user.pipe(
      first(),
      switchMap(user => {
        if (!user) return of('User not logged in'); // Handling not logged in case
        const uid = user.uid;
        const friendsRef = this.db.object<string[]>(`/users/${uid}/friends`).valueChanges(); // Specify that we expect a string array
        return friendsRef.pipe(
          first(),
          switchMap((friends: string[] | null) => { // Properly type as possibly null
            if (friends && friends.includes(friendId)) {
              return of('Already friends'); // Handle already friends case
            }
            const updatedFriends = friends ? [...friends, friendId] : [friendId];
            return this.db.object(`/users/${uid}`).update({ friends: updatedFriends });
          }),
          catchError(error => of(`Failed to add friend: ${error}`)) // Error handling
        );
      }),
      catchError(error => of(`Failed to process friend addition: ${error}`))
    );
  }
}
