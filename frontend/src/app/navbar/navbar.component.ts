import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    const searchFocus = document.getElementById('search-focus') as HTMLInputElement;

    const keys = [
      { keyCode: 'AltLeft', isTriggered: false },
      { keyCode: 'ControlLeft', isTriggered: false },
    ];

    window.addEventListener('keydown', (e) => {
      keys.forEach((obj) => {
        if (obj.keyCode === e.code) {
          obj.isTriggered = true;
        }
      });

      const shortcutTriggered = keys.filter((obj) => obj.isTriggered).length === keys.length;

      if (shortcutTriggered) {
        searchFocus.focus();
      }
    });

    window.addEventListener('keyup', (e) => {
      keys.forEach((obj) => {
        if (obj.keyCode === e.code) {
          obj.isTriggered = false;
        }
      });
    });
  }

}
