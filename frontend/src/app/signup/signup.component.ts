import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @Input() username: string = '';
  @Input() password: string = '';
  @Input() email: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  signup(): void {
    console.log('Username: ', this.username);
    console.log('Password: ', this.password);
    console.log('Email: ', this.email);
  }

}
