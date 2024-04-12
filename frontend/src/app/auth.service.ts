import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User | null>;

  constructor(
    private afAuth: AngularFireAuth,
    private dialog: MatDialog,
    private db: AngularFireDatabase
  ) {
    this.user$ = afAuth.authState;
  }

  async signUp(email: string, password: string, username: string) {
    try {
      const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);

      const usernameTag = await this.generateUniqueUsernameTag(username);

      if (credential.user) {
        await credential.user.updateProfile({ displayName: username, usernameTag: usernameTag } as { displayName?: string | null | undefined; photoURL?: string | null | undefined; usernameTag?: string });
      }

    } catch (error) {
      throw error;
    }
  }

  signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    return this.afAuth.signOut();
  }

  async getCurrentUser(): Promise<firebase.User | null> {
    return this.afAuth.currentUser;
  }

  async isAuthenticated(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return !!user;
  }

  async showAuthDialog(): Promise<void> {
    this.dialog.open(AuthDialogComponent, {
      width: '850px',
    });
  }

  async generateUniqueUsernameTag(username: string): Promise<string> {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';

    username = username.trim().toUpperCase();

    const usernamePrefix = username.substr(0, Math.min(username.length, 3));

    let tag = '';

    tag += usernamePrefix;

    for (let i = 0; i < 1; i++) {
      const randomNumber = numbers.charAt(Math.floor(Math.random() * numbers.length));
      tag += randomNumber;
    }

    const snapshot = await this.db.list('users', ref => ref.orderByChild('usernameTag').equalTo(tag)).valueChanges().toPromise();
    if (snapshot && snapshot.length > 0) {
      return this.generateUniqueUsernameTag(username);
    }

    return tag;
  }

}
