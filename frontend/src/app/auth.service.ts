import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User | null>;

  constructor(
    private afAuth: AngularFireAuth,
    private dialog: MatDialog,
    private db: AngularFireDatabase,
    private firestore: AngularFirestore
  ) {
    this.user$ = afAuth.authState;
  }

  registerUser(email: string, password: string, additionalData: any): Promise<void> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user) {
          console.log('Utilisateur créé avec succès', result.user);
          return this.firestore.collection('users').doc(result.user.uid).set({
            email: result.user.email,
            username: additionalData
          });
        } else {
          throw new Error('No user data available after registration.');
        }
      })
      .then(() => {
        console.log('Données utilisateur enregistrées dans Firestore');
      })
      .catch(error => {
        console.error('Erreur lors de l\'inscription ou de l\'enregistrement des données:', error);
        throw error; // Correctly throw the error to be caught by the caller
      });
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
      panelClass: 'custom-modalbox',
    });
  }

  updateUserData(uid: string, data: Partial<firebase.User>) {
    return this.firestore.doc(`users/${uid}`).update(data);
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
