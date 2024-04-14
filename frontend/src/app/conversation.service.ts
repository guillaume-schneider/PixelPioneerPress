import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private db: AngularFireDatabase) { }

  // Création d'une nouvelle conversation
  createConversation(participants: string[]): string | null {
    const newConversationRef = this.db.list('conversations').push({
      participants: participants.reduce((acc, cur) => ({ ...acc, [cur]: true }), {}),
      createdAt: new Date().getTime()
    });
    return newConversationRef.key;  // Retourne l'ID de la nouvelle conversation
  }

  // Envoi d'un message
  sendMessage(conversationId: string, senderId: string, message: string) {
    const timestamp = new Date().getTime();
    this.db.list(`messages/${conversationId}`).push({
      senderId: senderId,
      text: message,
      timestamp: timestamp
    });
  }

  // Récupération des messages d'une conversation
  getMessages(conversationId: string): Observable<any[]> {
    return this.db.list(`messages/${conversationId}`).valueChanges();
  }
}
