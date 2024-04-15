import { Component } from '@angular/core';
import { ConversationService } from '../conversation.service';

@Component({
  selector: 'app-new-conversation',
  template: `<!-- Template here -->`
})
export class NewConversationComponent {
  constructor(private conversationService: ConversationService) {}

  startConversation(userIds: string[]) {
    this.conversationService.createConversation(userIds).
    then((conversationId: string | null) => {
      if (conversationId) {
        this.conversationService.sendMessage(conversationId, userIds[0], 'Bonjour ! Comment vas-tu ?');
      }
    })
  }
}
