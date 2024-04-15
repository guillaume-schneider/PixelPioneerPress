import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';  // No longer using @Input for form fields
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
  }

  signIn() {
    this.authService.signIn(this.email, this.password)
      .then(() => {
        // Navigate on successful sign in
        this.router.navigateByUrl('/');
      })
      .catch(error => {
        // Handle authentication errors
        console.error('Sign-in error:', error);
        this.errorMessage = error.message;
      });
  }
}
