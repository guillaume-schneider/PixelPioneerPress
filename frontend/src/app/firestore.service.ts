import { Injectable } from '@angular/core';
import { collection, addDoc, Firestore, onSnapshot, query, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) {}

  // Method to send messages
  async sendMessage(message: string): Promise<void> {
    try {
      const docRef = await addDoc(collection(this.firestore, "messages"), {
        text: message,
        timestamp: new Date()
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  receiveMessages(): Observable<any[]> {
    return new Observable((observer) => {
      const q = query(collection(this.firestore, "messages"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messages: any[] | undefined = [];
        querySnapshot.forEach((doc) => {
          messages.push({ ...doc.data(), id: doc.id, timestamp: doc.data()['timestamp']?.toDate() });
        });
        observer.next(messages);
      }, (error) => {
        observer.error(error);
      });

      return { unsubscribe };
    });
  }
}
