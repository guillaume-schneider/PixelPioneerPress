import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @Input() username: string = '';
  @Input() password: string = '';
  @Input() email: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async signUp() {
    try {
      await this.authService.signUp(this.email, this.password, this.username);
      this.router.navigateByUrl('/');
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }

}
