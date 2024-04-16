import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { MessageService } from '../message.service';
import { UnreadMessageService } from '../unread-message.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  totalUnreadMessageCount: number = 0;

  constructor(public authService: AuthService, private messageService: MessageService,
    private unreadMessageService: UnreadMessageService
  ) { }

  ngOnInit(): void {
    this.updateUnreadMessageCount();
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

  updateUnreadMessageCount(): void {
    this.messageService.getTotalUnreadMessageCount().then(count => {
      console.log('Total unread message count:', count);
      this.totalUnreadMessageCount = count;
    }).catch(error => {
      console.error('Error retrieving unread message count:', error);
    });

    // Utiliser le service UnreadMessageService pour écouter les changements du nombre de messages non lus
    const currentUserUid = this.authService.getCurrentUserUid();
    if (currentUserUid) {
      this.unreadMessageService.listenForUnreadMessageCount(currentUserUid, 'conversationId').subscribe(count => {
        console.log('Unread message count for user:', count);
        // Mettre à jour le nombre total de messages non lus dans la barre de navigation
        this.totalUnreadMessageCount += count; // Ajouter le nombre de messages non lus de la conversation actuelle
      });
    }
  }

}
