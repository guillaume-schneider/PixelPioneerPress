import { Component } from '@angular/core';
import { FriendService } from '../friend.service';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent {
  searchText = '';
  users: any[] = [];  // Remplacer 'any' par le type approprié si disponible
  filteredUsers: any[] = [];

  constructor(private friendService: FriendService) {
    this.loadAllUsers();
  }

  loadAllUsers() {
    this.friendService.getAllUsers().subscribe(users => {
      this.users = users;
      console.log('Utilisateurs:', users);
      this.filteredUsers = users;
    });
  }

  searchUsers() {
    console.log(this.users)
    if (!this.searchText.trim()) {
      this.filteredUsers = [];
      return;
    }
    this.filteredUsers = this.users.filter(user =>
      user.username.toLowerCase().includes(this.searchText.toLowerCase())
    );
    console.log('Utilisateurs filtrés:', this.filteredUsers);
  }

  addFriend(user: any) {
    this.friendService.addFriend(user.id).subscribe(result => {
      if (result === 'Already friends') {
        alert('Vous êtes déjà amis !');
      } else {
        alert('Ami ajouté avec succès !');
      }
    }, error => {
      console.error('Erreur lors de l\'ajout de l\'ami:', error);
    });
  }
}
