import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'errorFormat'
})
export class ErrorFormatPipe implements PipeTransform {

  transform(error: string): string {
    console.log('Error:', error);
    if (error && typeof error === 'string' && error.startsWith('Firebase: Error (auth/')) {
      const errorCode = error.substring('Firebase: Error (auth/'.length, error.indexOf(').'));
      switch (errorCode) {
        case 'missing-email':
          return 'Adresse e-mail manquante';
        case 'wrong-password':
          return 'Mot de passe incorrect';
        case 'invalid-email':
          return 'Adresse e-mail invalide';
        default:
          return 'Erreur de connexion';
      }
    } else {
      return 'Erreur inconnue';
    }
  }

}
