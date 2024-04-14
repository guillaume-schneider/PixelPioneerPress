import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/Game';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        query('.image-card', [
          style({ transform: 'translateY(200px)', opacity: 0 }),
          stagger(800, [
            animate('1.4s ease', style({ transform: 'translateY(0)', opacity: 1 }))
          ])
        ])
      ])
    ])
  ]
})
export class WelcomeComponent implements OnInit {

  games: Game[] = [
    {
      id: 1,
      title: 'Minecraft',
      developer: 'Mojang Studios',
      genres: ['Sandbox', 'Survival'],
      description: 'Minecraft est un jeu vidéo de type « bac à sable » (construction complètement libre) développé par le Suédois Markus Persson, alias Notch, puis par le studio de développement Mojang',
      image: '../../assets/images/minecraft.jpg',
      linux_requirement: 'Non disponible',
      mac_requirement: 'Non disponible',
      negative_rating: 0,
      pc_requirement: '2 GB de RAM, Processeur 1.8 GHz, 128 Mo Carte graphique, 100 Mo Espace disque',
      positive_rating: 0,
      publisher: 'Mojang Studios',
      release_date: '18 novembre 2011',
      short_description: 'Construisez et explorez dans ce jeu de type bac à sable et de survie.',
      video: 'lien/vers/une/video/minecraft.mp4'
    },
    {
      id: 2,
      title: 'The Witcher 3: Wild Hunt',
      developer: 'CD Projekt Red',
      genres: ['Action-RPG'],
      description: 'The Witcher 3: Wild Hunt est un jeu vidéo de rôle développé par le studio polonais CD Projekt Red. Il s\'agit du troisième volet de la série de jeux The Witcher, inspirée des œuvres de l\'écrivain Andrzej Sapkowski',
      image: '../../assets/images/witcher.jpg',
      linux_requirement: 'Non disponible',
      mac_requirement: 'Non disponible',
      negative_rating: 0,
      pc_requirement: '8 GB de RAM, Processeur Intel Core i5-2500K 3.3 GHz, 2 GB Carte graphique NVIDIA GeForce GTX 660 / AMD Radeon HD 7870, 35 GB Espace disque',
      positive_rating: 0,
      publisher: 'CD Projekt',
      release_date: '19 mai 2015',
      short_description: 'Plongez dans un monde ouvert fantastique rempli de monstres, de mystères et de magie.',
      video: 'lien/vers/une/video/witcher3.mp4'
    },
    {
      id: 3,
      title: 'Grand Theft Auto V',
      developer: 'Rockstar North',
      genres: ['Action-aventure'],
      description: 'Grand Theft Auto V est un jeu vidéo d\'action-aventure développé par Rockstar North et édité par Rockstar Games. Il est sorti en septembre 2013 sur PlayStation 3 et Xbox 360, en novembre 2014 sur PlayStation 4 et Xbox One, et en avril 2015 sur Microsoft Windows',
      image: '../../assets/images/gta.jpg',
      linux_requirement: 'Non disponible',
      mac_requirement: 'Non disponible',
      negative_rating: 0,
      pc_requirement: '4 GB de RAM, Processeur Intel Core 2 Quad CPU Q6600 2.40 GHz / AMD Phenom 9850 Quad-Core Processor 2.5 GHz, 1 GB Carte graphique NVIDIA 9800 GT 1GB / AMD HD 4870 1GB (DX 10, 10.1, 11), 72 GB Espace disque',
      positive_rating: 0,
      publisher: 'Rockstar Games',
      release_date: '17 septembre 2013',
      short_description: 'Explorez la ville fictive de Los Santos et sa campagne environnante dans ce jeu d\'action-aventure en monde ouvert.',
      video: 'lien/vers/une/video/gtav.mp4'
    },
    {
      id: 4,
      title: 'The Legend of Zelda: Breath of the Wild',
      developer: 'Nintendo EPD',
      genres: ['Action-aventure'],
      description: 'The Legend of Zelda: Breath of the Wild est un jeu d\'action-aventure développé et édité par Nintendo, sorti en mars 2017 sur la console Nintendo Switch et sur Wii U',
      image: '../../assets/images/zelda.jpg',
      linux_requirement: 'Non disponible',
      mac_requirement: 'Non disponible',
      negative_rating: 0,
      pc_requirement: '4 GB de RAM, Processeur Intel Core i5-5300U 2.3 GHz, 2 GB Carte graphique NVIDIA GeForce GT 640 / AMD Radeon HD 7750, 13 GB Espace disque',
      positive_rating: 0,
      publisher: 'Nintendo',
      release_date: '3 mars 2017',
      short_description: 'Plongez dans un monde ouvert plein d\'aventures épiques et de mystères dans la dernière aventure de Link.',
      video: 'lien/vers/une/video/zelda.mp4'
    }
  ];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

  }

  getAnimationDelay(index: number): string {
    return `${index * 0.6}s`;
  }

  openAuthDialog(): void {
    this.authService.showAuthDialog();
  }
}
