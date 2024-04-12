import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../wishlist.service';
import { GameService } from '../game.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlistIds: any; // Définissez le type approprié pour les données de la wishlist
  wishlistGames: any[] = []; // Liste pour stocker les détails des jeux de la wishlist

  constructor(
    private wishlistService: WishlistService,
    private gameService: GameService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadWishlist();
  }

  async loadWishlist() {
    const currentUser = await this.authService.getCurrentUser();
    this.wishlistService.getWishlistByUser(currentUser?.uid ?? '').subscribe({
      next: (wishlist: any) => {
        this.wishlistIds = wishlist;
        this.loadGamesDetails();
      },
      error: (error: any) => {
        console.error('Une erreur s\'est produite lors du chargement de la wishlist : ', error);
      }
    });
  }

  async loadGamesDetails() {
    this.wishlistIds.forEach((gameId: number) => {
      this.gameService.getGameById(gameId).subscribe({
        next: (game: any) => {
          this.wishlistGames.push(game);
        },
        error: (error: any) => {
          console.error(`Une erreur s'est produite lors de la récupération du jeu avec l'ID ${gameId} : `, error);
        }
      });
    });
  }
}
