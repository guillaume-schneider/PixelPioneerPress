import { Injectable } from '@angular/core';
import { Firestore, collection, onSnapshot, query as fsQuery, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { setDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private firestore: Firestore, private authService: AuthService) {}

  async listenForConversations(userId: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const conversationsRef = collection(this.firestore, 'conversations');
      const q = fsQuery(conversationsRef, where('participants', 'array-contains', userId));

      onSnapshot(q, (snapshot) => {
        const updatedConversations = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        resolve(updatedConversations);
      }, error => {
        console.error("Error listening to conversations:", error);
        reject(error);
      });
    });
  }
}
