import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.css']
})
export class AuthDialogComponent implements OnInit {
  @Input() username!:string;
  @Input() password!:string;
  @Input() email!:string;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router,
    public dialogRef: MatDialogRef<AuthDialogComponent>) { }

  ngOnInit(): void {
  }

  signIn() {
    this.authService.signIn(this.email, this.password)
      .then((userCredential) => {
        // Sign-in successful
        const user = userCredential.user;
        console.log('User signed in:', user);
        this.router.navigateByUrl('/');
      })
      .catch((error) => {
        // Handle sign-in errors
        console.error('Sign-in error:', error);
        // Mettre à jour le message d'erreur avec le message d'erreur approprié
        this.errorMessage = error.message;
      });
  }

  closeAuthDialog(): void {
    this.dialogRef.close();
  }
}
