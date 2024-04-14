import { Component } from '@angular/core';
import { ConversationService } from '../conversation.service';

@Component({
  selector: 'app-new-conversation',
  template: `<!-- Template here -->`
})
export class NewConversationComponent {
  constructor(private conversationService: ConversationService) {}

  startConversation(userIds: string[]) {
    const conversationId = this.conversationService.createConversation(userIds);
    if (conversationId) {
      this.conversationService.sendMessage(conversationId, userIds[0], 'Bonjour ! Comment vas-tu ?');
    }
  }
}
