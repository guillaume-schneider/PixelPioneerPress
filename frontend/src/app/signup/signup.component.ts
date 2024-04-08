import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

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

  ngOnInit(): void {
  }


  constructor(private afAuth: AngularFireAuth) {}

  signUp() {
    this.afAuth.createUserWithEmailAndPassword(this.email, this.password)
      .then((userCredential) => {
        // Sign-up successful
        const user = userCredential.user;
        console.log('User signed up:', user);
      })
      .catch((error) => {
        // Handle sign-up errors
        this.errorMessage = error.message;
        console.error('Sign-up error:', error);
      });
  }

}
