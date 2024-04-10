import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User | null>;

  constructor(private afAuth: AngularFireAuth, private dialog: MatDialog) {
    this.user$ = afAuth.authState;
  }

  async signUp(email: string, password: string, username: string) {
    try {
      // Créer le compte utilisateur avec email et mot de passe
      const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);

      // Mettre à jour le profil utilisateur avec le nom d'utilisateur
      if (credential.user) {
        await credential.user.updateProfile({ displayName: username });
      }

      // Rediriger l'utilisateur ou effectuer d'autres actions nécessaires
      // par exemple, enregistrer les informations dans une base de données Firestore
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

  async showAuthDialog(): Promise<void> {
    this.dialog.open(AuthDialogComponent, {
      width: '850px',
    });
  }
}
