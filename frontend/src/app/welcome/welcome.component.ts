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
      title: "Minecraft",
      developer: "Mojang Studios",
      genres: ["Sandbox", "Survival"],
      description: "Minecraft is a sandbox video game (completely free-form construction) developed by Swedish programmer Markus Persson, also known as Notch, and later by the development studio Mojang.",
      image: "../../assets/images/minecraft.jpg",
      linux_requirement: "Not available",
      mac_requirement: "Not available",
      negative_rating: 0,
      pc_requirement: "2 GB RAM, 1.8 GHz Processor, 128 MB Graphics card, 100 MB Disk space",
      positive_rating: 0,
      publisher: "Mojang Studios",
      release_date: "November 18, 2011",
      short_description: "Build and explore in this sandbox and survival game.",
      video: "link/to/a/video/minecraft.mp4"
    },
    {
      id: 2,
      title: "The Witcher 3: Wild Hunt",
      developer: "CD Projekt Red",
      genres: ["Action-RPG"],
      description: "The Witcher 3: Wild Hunt is a role-playing video game developed by the Polish studio CD Projekt Red. It is the third installment in The Witcher game series, inspired by the works of writer Andrzej Sapkowski.",
      image: "../../assets/images/witcher.jpg",
      linux_requirement: "Not available",
      mac_requirement: "Not available",
      negative_rating: 0,
      pc_requirement: "8 GB RAM, Intel Core i5-2500K 3.3 GHz Processor, 2 GB Graphics card NVIDIA GeForce GTX 660 / AMD Radeon HD 7870, 35 GB Disk space",
      positive_rating: 0,
      publisher: "CD Projekt",
      release_date: "May 19, 2015",
      short_description: "Dive into a fantastic open world full of monsters, mysteries, and magic.",
      video: "link/to/a/video/witcher3.mp4"
    },
    {
      id: 3,
      title: "Grand Theft Auto V",
      developer: "Rockstar North",
      genres: ["Action-Adventure"],
      description: "Grand Theft Auto V is an action-adventure video game developed by Rockstar North and published by Rockstar Games. It was released in September 2013 on PlayStation 3 and Xbox 360, in November 2014 on PlayStation 4 and Xbox One, and in April 2015 on Microsoft Windows.",
      image: "../../assets/images/gta.jpg",
      linux_requirement: "Not available",
      mac_requirement: "Not available",
      negative_rating: 0,
      pc_requirement: "4 GB RAM, Intel Core 2 Quad CPU Q6600 2.40 GHz / AMD Phenom 9850 Quad-Core Processor 2.5 GHz, 1 GB Graphics card NVIDIA 9800 GT 1GB / AMD HD 4870 1GB (DX 10, 10.1, 11), 72 GB Disk space",
      positive_rating: 0,
      publisher: "Rockstar Games",
      release_date: "September 17, 2013",
      short_description: "Explore the fictional city of Los Santos and its surrounding countryside in this open-world action-adventure game.",
      video: "link/to/a/video/gtav.mp4"
    },
    {
      id: 4,
      title: "The Legend of Zelda: Breath of the Wild",
      developer: "Nintendo EPD",
      genres: ["Action-Adventure"],
      description: "The Legend of Zelda: Breath of the Wild is an action-adventure video game developed and published by Nintendo, released in March 2017 on the Nintendo Switch console and Wii U.",
      image: "../../assets/images/zelda.jpg",
      linux_requirement: "Not available",
      mac_requirement: "Not available",
      negative_rating: 0,
      pc_requirement: "4 GB RAM, Intel Core i5-5300U 2.3 GHz Processor, 2 GB Graphics card NVIDIA GeForce GT 640 / AMD Radeon HD 7750, 13 GB Disk space",
      positive_rating: 0,
      publisher: "Nintendo",
      release_date: "March 3, 2017",
      short_description: "Dive into an open world full of epic adventures and mysteries in Link's latest journey.",
      video: "link/to/a/video/zelda.mp4"
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
