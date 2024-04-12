import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private firestore: AngularFirestore) {}

  getMessages(conversationId: string) {
    return this.firestore.collection(`conversations/${conversationId}/messages`, ref => ref.orderBy('timestamp')).valueChanges();
  }

  sendMessage(conversationId: string, content: string) {
    const messageData = {
      content: content,
      senderId: firebase.auth().currentUser?.uid,
      timestamp: new Date()
    };
    return this.firestore.collection(`conversations/${conversationId}/messages`).add(messageData);
  }
}
