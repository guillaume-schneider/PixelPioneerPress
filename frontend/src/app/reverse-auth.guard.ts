import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReverseAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        this.authService.isAuthenticated().then(isAuthenticated => {
          console.log('isAuthenticated', isAuthenticated);
          if (isAuthenticated) {
            resolve(false);
          } else {
            resolve(true);
          }
        });
      }, 350);
    });
  }
}
