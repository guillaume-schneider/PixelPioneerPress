import { Component, OnInit } from '@angular/core';
import { FriendService } from '../friend.service';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent implements OnInit {
  friends: string[] = [];

  constructor(private friendService: FriendService) {}

  ngOnInit(): void {
    // Assuming you have userId available
    const userId = 'user123';
    this.friendService.getFriends(userId).subscribe((friends: string[]) => {
      this.friends = friends;
    });
  }
}
