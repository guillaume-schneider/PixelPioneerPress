import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firebaseSignUpError'
})
export class FirebaseSignUpErrorPipe implements PipeTransform {

  transform(error: string): string {
    if (error && typeof error === 'string') {
      if (error.includes('auth/email-already-in-use')) {
        return 'Cette adresse e-mail est déjà utilisée par un autre compte';
      } else if (error.includes('auth/invalid-email')) {
        return 'Adresse e-mail invalide';
      } else if (error.includes('auth/weak-password')) {
        return 'Le mot de passe est trop faible';
      } else if (error.includes('auth/email')) {
        return 'Veuillez saisir une adresse e-mail';
      }
       else {
        return 'Erreur lors de la création du compte';
      }
    } else {
      return 'Erreur inconnue';
    }
  }

}
