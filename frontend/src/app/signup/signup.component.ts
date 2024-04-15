import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  email: string = '';
  password: string = '';
  username: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async signUp() {
    try {
      this.errorMessage = '';
      await this.authService.registerUser(this.email, this.password, this.username);
      this.router.navigateByUrl('/home');
    } catch (error: any) {
      this.errorMessage = error.message; // Ensure the error message is displayed
      console.log('Error:', error);
    }
  }
}
