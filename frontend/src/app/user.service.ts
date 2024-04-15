import { Injectable } from '@angular/core';
import { Database, ref, query, orderByChild, startAt, endAt, getDatabase, onValue } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private db: Database;

  constructor() {
    this.db = getDatabase();  // Initialize Firebase Database
  }

  searchUsers(queryStr: string): Observable<any[]> {
    // Reference to users with a query based on username
    const usersRef = ref(this.db, 'users');
    const searchQuery = query(usersRef, orderByChild('username'), startAt(queryStr), endAt(queryStr + '\uf8ff'));

    // Return an Observable that converts the snapshot to an array of users
    return new Observable(subscriber => {
      onValue(searchQuery, (snapshot) => {
        const users: any[] | undefined = [];
        snapshot.forEach(childSnapshot => {
          const key = childSnapshot.key;
          const value = childSnapshot.val();
          users.push({ key, ...value });  // Assuming you want to combine key and other data
        });
        subscriber.next(users);
      }, {
        onlyOnce: true  // If you only want to fetch data once; remove or change if continuous updates are needed
      });
    });
  }
}
