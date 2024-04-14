import { Component } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  searchText: string = '';
  conversations = [
    { friendName: 'Alice', lastMessage: 'Salut, comment ça va ?' },
    { friendName: 'Bob', lastMessage: 'As-tu terminé le projet ?' },
    // Ajoutez d'autres conversations fictives ici
  ];

  searchFriends() {
    console.log('Recherche des amis avec le texte:', this.searchText);
    // Logique pour rechercher des amis
  }
}
