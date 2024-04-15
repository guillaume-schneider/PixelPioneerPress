import { Injectable } from '@angular/core';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Database, getDatabase, ref, push, set, get, child, update } from '@angular/fire/database';
import { from, Observable } from 'rxjs';
import { first, switchMap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  private auth: Auth;
  private db: Database;

  constructor() {
    this.auth = getAuth();
    this.db = getDatabase();
  }

  // Récupération de tous les utilisateurs
  getAllUsers(): Observable<any[]> {
    const usersRef = ref(this.db, '/users');
    return from(get(usersRef)).pipe(
      map(snapshot => snapshot.val())
    );
  }

  getFriends(userId: string): Observable<string[]> {
    const friendsRef = ref(this.db, `/users/${userId}/friends`);
    return from(get(friendsRef)).pipe(
      map(snapshot => snapshot.val() || [])
    );
  }

  addFriend(friendId: string): Observable<any> {
    return new Observable(observer => {
      onAuthStateChanged(this.auth, (user) => {
        if (!user) {
          observer.next('User not logged in');
          observer.complete();
        } else {
          const uid = user.uid;
          const friendsRef = ref(this.db, `/users/${uid}/friends`);
          get(friendsRef).then(friendsSnapshot => {
            const friends = friendsSnapshot.val() || [];
            if (friends.includes(friendId)) {
              observer.next('Already friends');
              observer.complete();
            } else {
              const updatedFriends = [...friends, friendId];
              update(ref(this.db, `/users/${uid}`), { friends: updatedFriends }).then(() => {
                observer.next('Friend added');
                observer.complete();
              }).catch(error => {
                observer.error(`Failed to add friend: ${error}`);
              });
            }
          }).catch(error => {
            observer.error(`Failed to fetch friends: ${error}`);
          });
        }
      }, error => {
        observer.error(`Failed to process friend addition: ${error}`);
      });
    });
  }
}
