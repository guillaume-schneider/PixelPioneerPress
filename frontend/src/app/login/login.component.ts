import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() username!:string;
  @Input() password!:string;
  @Input() email!:string;
  errorMessage: string = '';


  ngOnInit(): void {
  }

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  signIn() {
    this.afAuth.signInWithEmailAndPassword(this.email, this.password)
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
}
