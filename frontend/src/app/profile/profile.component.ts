import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import firebase from 'firebase/compat/app';

interface UserUpdate {
  displayName?: string;
  email?: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user!: firebase.User | null;
  newDisplayName!: string | null;
  newEmail!: string | null;
  isEditMode: boolean = false;
  displayNameError: string | null = null;
  emailError: string | null = null;
  hasError: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      if (!user) return;
      this.newDisplayName = user.displayName;
      this.newEmail = user.email;
    });
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  updateProfile() {
    if (!this.user) return;
    const updates: UserUpdate = {};

    if (this.newDisplayName !== this.user.displayName) {
      if (this.newDisplayName !== null) {
        this.user.updateProfile({ displayName: this.newDisplayName })
          .then(() => {
            if (this.newDisplayName !== this.user?.displayName) {
              console.log('Display name updated successfully');
              updates.displayName = this.newDisplayName ?? undefined;
            }
            this.displayNameError = null;
          })
          .catch(error => {
            console.error('Error updating display name:', error);
            this.displayNameError = error.message;
          });
      }
    }

    if (this.newEmail && this.newEmail !== this.user.email) {
      this.user.updateEmail(this.newEmail)
        .then(() => {
          if (this.newEmail !== this.user?.email) {
            console.log('Email updated successfully');
            updates.email = this.newEmail ?? undefined;
          }
          this.emailError = null;
        })
        .catch(error => {
          console.error('Error updating email:', error);
          this.emailError = error.message;
        });
    }

    if (Object.keys(updates).length > 0) {
      this.authService.updateUserData(this.user.uid, updates).then(() => {
        console.log('Firestore user data updated');
      }).catch(error => {
        console.error('Error updating Firestore user data:', error);
      });
    }

    this.checkErrors();
    if (!this.hasError) {
      this.isEditMode = false;
    }
  }

  checkErrors() {
    this.hasError = !!this.displayNameError || !!this.emailError;
  }
}
