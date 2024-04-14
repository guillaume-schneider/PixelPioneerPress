import { Component, Input, OnInit } from '@angular/core';
import { trigger, style, animate, transition, query, stagger } from '@angular/animations';
import { Game } from 'src/models/Game';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.css'],
})
export class HomeCardComponent implements OnInit {
  @Input() game!: Game;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  link() {
    this.authService.isAuthenticated().then(isAuthenticated => {
        if (!isAuthenticated) {
          this.authService.showAuthDialog();
        } else {
          this.router.navigate(['/game', this.game.id]);
        }
      }
    );
  }
}
