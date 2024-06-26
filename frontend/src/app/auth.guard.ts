import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        this.authService.isAuthenticated().then(isAuthenticated => {
          console.log('isAuthenticated', isAuthenticated);
          if (isAuthenticated) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      }, 350);
    });
  }
}
