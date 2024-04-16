import { Injectable } from '@angular/core';
import { Database } from '@angular/fire/database';
import { onValue, ref } from 'firebase/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnreadMessageService {

  constructor(private db: Database) {}

  listenForUnreadMessageCount(userId: string, conversationId: string): Observable<number> {
    return new Observable<number>((observer) => {
      const unreadMessageCountRef = ref(this.db, `users/${userId}/unreadMessageCount/${conversationId}`);
      onValue(unreadMessageCountRef, (snapshot: { val: () => number; }) => {
        const unreadMessageCount = snapshot.val() ?? 0; // Use 0 if the count is not available
        observer.next(unreadMessageCount);
      });
    });
  }
}
