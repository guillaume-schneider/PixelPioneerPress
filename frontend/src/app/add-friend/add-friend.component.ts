import { Component } from '@angular/core';
import { FriendService } from '../friend.service';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent {
  searchText: string = '';
  allUsers: any[] = [];
  filteredUsers: any[] = [];

  constructor(private friendService: FriendService) {
    this.loadAllUsers();
  }

  loadAllUsers(): void {
    this.friendService.getAllUsers().subscribe(users => {
      this.allUsers = users;
    }, error => {
      console.error('Failed to load users:', error);
    });
  }

  searchUsers(): void {
    if (this.searchText) {
      this.filteredUsers = this.allUsers.filter(user =>
        user.username.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredUsers = [];
    }
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
