import { Injectable } from '@angular/core';
import { Database, ref, push, set, getDatabase, child, get } from '@angular/fire/database';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  private db: Database;

  constructor() {
    this.db = getDatabase();  // Initialize Firebase Database
  }

  // Création d'une nouvelle conversation
  createConversation(participants: string[]): Promise<string | null> {
    const newConversationRef = ref(this.db, 'conversations');
    const newConvRef = push(newConversationRef); // This is a ThenableReference
    return set(newConvRef, {
      participants: participants.reduce((acc, cur) => ({ ...acc, [cur]: true }), {}),
      createdAt: new Date().getTime()
    }).then(() => newConvRef.key);  // Return the ID of the new conversation after setting the data
  }

  // Envoi d'un message
  sendMessage(conversationId: string, senderId: string, message: string): Promise<void> {
    const messagesRef = ref(this.db, `messages/${conversationId}`);
    const newMessageRef = push(messagesRef); // This is a ThenableReference
    return set(newMessageRef, {
      senderId: senderId,
      text: message,
      timestamp: new Date().getTime()
    }); // Return a promise that resolves when the message is sent
  }

  // Récupération des messages d'une conversation
  getMessages(conversationId: string): Observable<any[]> {
    const messagesRef = ref(this.db, `messages/${conversationId}`);
    return from(get(child(messagesRef, '/'))).pipe(
      map(snapshot => snapshot.exists() ? snapshot.val() : [])
    );
  }
}
