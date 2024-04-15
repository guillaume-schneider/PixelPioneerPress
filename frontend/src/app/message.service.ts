import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, orderBy, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private firestore: Firestore) {}

  getMessages(conversationId: string): Observable<any[]> {
    const messagesRef = collection(this.firestore, `conversations/${conversationId}/messages`);
    return new Observable((subscriber) => {
      const q = query(messagesRef, orderBy('timestamp'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map(doc => doc.data());
        subscriber.next(messages);
      }, (error) => {
        subscriber.error(error);
      });
      return () => unsubscribe();
    });
  }

  async sendMessage(conversationId: string, content: string): Promise<void> {
    const messagesRef = collection(this.firestore, `conversations/${conversationId}/messages`);
    await addDoc(messagesRef, { content: content, timestamp: new Date() });
  }
}
