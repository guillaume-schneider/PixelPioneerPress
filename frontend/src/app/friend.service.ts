import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  constructor(private db: AngularFireDatabase) {}

  addFriend(userId: string, friendId: string) {
    this.db.object(`friends/${userId}/${friendId}`).set(true);
    this.db.object(`friends/${friendId}/${userId}`).set(true);
  }

  getFriends(userId: string) {
    return this.db.list(`friends/${userId}`).valueChanges().pipe(
      map((friends: any[]) => friends.map(friend => friend as string))
    );
  }
}
