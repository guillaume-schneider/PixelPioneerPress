import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() username!:string;
  @Input() password!:string;
  @Input() email!:string;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log('Username: ', this.username);
    console.log('Password: ', this.password);
    console.log('Email: ', this.email);
  }
}
