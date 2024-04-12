import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private db: AngularFireDatabase) {}

  searchUsers(query: string): Observable<any[]> {
    // Effectuer une recherche dans la base de données Firebase pour trouver les utilisateurs correspondants
    return this.db.list('users', ref => ref.orderByChild('username').startAt(query).endAt(query + '\uf8ff'))
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key }));
        })
      );
  }
}
