import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        this.authService.isAuthenticated().then(isAuthenticated => {
          console.log('isAuthenticated', isAuthenticated);
          if (isAuthenticated) {
            resolve(true);
            this.router.navigate(['/home']);
          } else {
            resolve(false);
            this.router.navigate(['/welcome']);
          }
        });
      }, 300);
    });
  }
}
