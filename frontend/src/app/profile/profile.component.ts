import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import firebase from 'firebase/compat/app';

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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;

      if (!user) {
        return;
      }

      this.newDisplayName = user.displayName;
      this.newEmail = user.email;
    });
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  updateProfile() {
    if (!this.user) {
      return;
    }

    // Mettre à jour le nom d'utilisateur
    this.user.updateProfile({ displayName: this.newDisplayName })
      .then(() => {
        console.log('Nom d\'utilisateur mis à jour avec succès');
      })
      .catch((error: any) => {
        console.error('Erreur lors de la mise à jour du nom d\'utilisateur:', error);
      });

    if (this.newEmail) {

    // Mettre à jour l'adresse e-mail
    this.user.updateEmail(this.newEmail)
      .then(() => {
        console.log('Adresse e-mail mise à jour avec succès');
      })
      .catch((error: any) => {
        console.error('Erreur lors de la mise à jour de l\'adresse e-mail:', error);
      });
    }
    // Passer en mode affichage après la mise à jour
    this.isEditMode = false;
  }
}
