import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConversationService } from '../conversation.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  messages: any[] = [];
  newMessage: string = '';
  conversationId!: string | null;

  constructor(private route: ActivatedRoute, private conversationService: ConversationService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.conversationId = this.route.snapshot.paramMap.get('id');
    this.loadMessages();
  }

  loadMessages() {
    // Appel à Firebase pour récupérer les messages
    this.conversationService.getMessages(this.conversationId ?? '').subscribe(messages => {
      this.messages = messages;
    });
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.authService.getCurrentUser().then(user => {
        if (user) {
          this.conversationService.sendMessage(this.conversationId ?? '', JSON.stringify(user), this.newMessage);
        }
      });
      this.newMessage = ''; // Clear the input after sending
    }
  }
}
