import { Component } from '@angular/core';
import { FriendService } from '../friend.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent {
  friendId: string = '';
  searchQuery: string = '';
  searchResults: any[] = [];

  constructor(private friendService: FriendService, private userService: UserService) {}

  addFriend(userId: any) {
    this.friendService.addFriend(userId, this.friendId);
    this.friendId = ''; // Clear input after adding friend
  }

  searchUsers(): void {
    if (this.searchQuery.trim() === '') {
      // Ne rien faire si la requête de recherche est vide
      return;
    }

    this.userService.searchUsers(this.searchQuery.trim()).subscribe(results => {
      this.searchResults = results;
    });
  }
}
