import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User, updateProfile, updateEmail } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user!: User | null;
  newDisplayName!: string | null;
  newEmail!: string | null;
  isEditMode: boolean = false;
  displayNameError: string | null = null;
  emailError: string | null = null;
  hasError: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getCurrentUser()
    .then((user: any) => {
      this.user = user;
    })

    if (this.user) {
      this.newDisplayName = this.user.displayName;
      this.newEmail = this.user.email;
    }
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  updateProfile() {
    if (!this.user) return;
    const updates: { displayName?: string, email?: string } = {};

    if (this.newDisplayName !== this.user.displayName) {
      updateProfile(this.user, { displayName: this.newDisplayName ?? undefined })
        .then(() => {
          console.log('Display name updated successfully');
          this.displayNameError = null;
        })
        .catch(error => {
          console.error('Error updating display name:', error);
          this.displayNameError = error.message;
        });
    }

    if (this.newEmail && this.newEmail !== this.user.email) {
      updateEmail(this.user, this.newEmail)
        .then(() => {
          console.log('Email updated successfully');
          this.emailError = null;
        })
        .catch(error => {
          console.error('Error updating email:', error);
          this.emailError = error.message;
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
