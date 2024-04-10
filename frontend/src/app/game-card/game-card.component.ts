import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WishlistService } from '../wishlist.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent implements OnInit {

  @Input() game: any;
  wishlist: any[] = [];
  showDesc: boolean = false;
  @ViewChild('description')
  description!: ElementRef;

  showRating: boolean = true;
  showPositive: boolean = false;
  showNegative: boolean = false;

  constructor(private wishlistService: WishlistService, private router: Router,
    private authService: AuthService) {}

  ngOnInit(): void {
  }

  toggleRating() {
    this.showRating = true;
    this.showPositive = false;
    this.showNegative = false;
  }

  toggleData() {
    this.showPositive = true;
    this.showNegative = true;
    this.showRating = false;

  }

  ngAfterViewInit() {
    this.setDescriptionHeight();
  }

  setDescriptionHeight() {
    if (this.description) {
      const descriptionHeight = this.description.nativeElement.scrollHeight;
      this.description.nativeElement.style.maxHeight = descriptionHeight + 'px';
    }
  }

  goToGameDetails() {
    this.router.navigate(['/game', this.game.id]);
  }

  async addToWishlist(gameId: string): Promise<void> {
    try {
      const currentUser = await this.authService.getCurrentUser();

      if (currentUser) {

        const userId = currentUser.uid;

        await this.wishlistService.addToWishlist(userId, gameId);
        console.log('Jeu ajouté à la wishlist avec succès');
      } else {
        console.error('L\'utilisateur n\'est pas authentifié. Afficher la popup d\'authentification.');
        await this.authService.showAuthDialog();
      }
    } catch (error) {
      console.error('Une erreur est survenue lors de la récupération de l\'utilisateur actuellement authentifié : ', error);
    }
  }

  showDescription() {
    this.showDesc = true;
  }

  hideDescription() {
    this.showDesc = false;
  }

  getRatingColor(ratio: number): string {
    if (ratio < 40) {
      return 'red';
    } else if (ratio >= 40 && ratio < 70) {
      return 'orange';
    } else if (ratio >= 70) {
      return 'green';
    } else {
      return 'black'; // Défaut
    }
  }

  getRatingStyle(): any {
    let rating = this.getRatioValue();
    let style = {
      'font-family': 'Arial, sans-serif',
      'font-size': '20px',
      'font-weight': 'bold',
      'color': this.getRatingColor(rating)
    };
    return style;
  }

  getRatioValue(): number {
    return (this.game.positive_rating/(this.game.positive_rating + this.game.negative_rating))*100;
  }

}