// messages.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConversationService } from '../conversation.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  conversations: any[] = [];
  filteredConversations: any[] = [];
  searchText: string = '';

  constructor(private conversationService: ConversationService, private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadConversations();
    console.log('this.conversations:', this.conversations);
  }

  loadConversations(): void {
    const currentUserUid = this.authService.getCurrentUserUid();
    if (currentUserUid) {
      this.conversationService.listenForConversations(currentUserUid).then(convs => {
        const promises = convs.map(async conversation => {
          const otherUserId = conversation.participants.user === currentUserUid ? conversation.participants[0] : conversation.participants[1];
          const username = await this.authService.getUsername(otherUserId);
          return { ...conversation, otherUsername: username };
        });

        Promise.all(promises).then(updatedConversations => {
          this.conversations = updatedConversations;
          this.filterConversations();
        }).catch(error => {
          console.error('Error resolving usernames:', error);
        });
      }).catch(error => {
        console.error('Error loading conversations:', error);
      });
    }
  }

  filterConversations(): void {
    if (this.searchText) {
      this.filteredConversations = this.conversations.filter(conv =>
        conv.otherUsername.toLowerCase().includes(this.searchText.toLowerCase()) ||
        conv.lastMessage.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredConversations = this.conversations;
    }
  }

  searchFriends(): void {
    this.filterConversations();
  }

  navigateToConversation(conversationId: string): void {
    this.router.navigate(['/message', conversationId]);
  }
}
