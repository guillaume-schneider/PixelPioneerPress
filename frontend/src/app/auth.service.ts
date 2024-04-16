import { Injectable } from '@angular/core';
// import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { MatDialog } from '@angular/material/dialog';

// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { AngularFireDatabase } from '@angular/fire/compat/database';
// import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, UserCredential } from '@angular/fire/auth';
import { Firestore, doc, setDoc, updateDoc, Timestamp, collection, getDoc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null>;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private dialog: MatDialog
  ) {
    this.user$ = authState(this.auth);
  }

  getCurrentUserUid(): string | null {
    const user = this.auth.currentUser;
    return user ? user.uid : null;
  }

  async registerUser(email: string, password: string, additionalData: any): Promise<void> {
    let userCredential = null;
    try {
      // Step 1: Create user in Firebase Authentication
      userCredential = await createUserWithEmailAndPassword(this.auth, email, password);

      // Check if the user was created
      if (userCredential.user) {
        try {
          // Step 2: Attempt to create the user document in Firestore
          await setDoc(doc(this.firestore, 'users', userCredential.user.uid), {
            email: userCredential.user.email,
            username: additionalData,
            profilePicture: '',
            createdAt: Timestamp.now()
          });
          console.log('User data written successfully to Firestore');
        } catch (error) {
          // Step 3: If Firestore fails, delete the user from Firebase Authentication
          console.error('Failed to write data to Firestore:', error);
          if (userCredential.user) {
            await userCredential.user.delete();
            console.log('User deleted from Firebase Authentication due to Firestore failure');
          }
          throw new Error('Registration failed, user was not added to Firestore.');
        }
      } else {
          throw new Error('No user data available after registration.');
      }
    } catch (error) {
    // Log and rethrow the error if the authentication itself fails
    console.error('Registration failed:', error);
    throw error;
    }
  }

  signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signOut(): Promise<void> {
    return signOut(this.auth);
  }

  async getCurrentUser(): Promise<User | null> {
    return this.auth.currentUser;
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

  updateUserData(uid: string, data: Partial<{ email: string; username: string; }>): Promise<void> {
    return updateDoc(doc(this.firestore, 'users', uid), data);
  }

  getUsername(userId: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const userDocRef = doc(this.firestore, 'users', userId);
      getDoc(userDocRef).then(docSnapshot => {
        if (docSnapshot.exists()) {
          const username = docSnapshot.data()?.['username'] || '';
          resolve(username);
        } else {
          resolve('');
        }
      }).catch(error => {
        reject(error);
      });
    });
  }

}
