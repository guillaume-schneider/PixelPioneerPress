import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../message.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  currentConversationId: string = ''; // Gardera l'ID de la conversation dynamiquement
  messages: any[] = [];
  newMessageText = '';

  constructor(private messageService: MessageService, private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.currentConversationId = params.get('id') || '';
      this.loadMessages();
      this.messageService.updateLastSeenOnViewingNewConversation(this.currentConversationId);
    });
  }

  ngOnDestroy(): void {
    this.messageService.unsubscribeFromConversationUpdates();
  }

  loadMessages(): void {
    this.messageService.getMessages(this.currentConversationId, (messages: never[]) => {
      this.messages = messages;
    });
  }

  sendMessage(): void {
    let currentUserUid = this.authService.getCurrentUserUid();
    if (!currentUserUid) {
      console.error('Current user not found');
      return;
    }

    if (this.newMessageText.trim()) {
      this.messageService.sendMessage(this.currentConversationId, this.newMessageText, currentUserUid);
      this.newMessageText = '';
    }
  }
}
