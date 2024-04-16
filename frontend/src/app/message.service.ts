import { Injectable } from '@angular/core';
import { ref, push, onValue, set, get } from 'firebase/database';
import { Database } from '@angular/fire/database';
import { AuthService } from './auth.service';
import { doc, DocumentSnapshot, getDoc, increment, onSnapshot, Unsubscribe, updateDoc } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private conversationSubscription: Unsubscribe | undefined;

  constructor(private db: Database, private authService: AuthService,
    private firestore: Firestore
  ) {
  }

  async sendMessage(conversationId: string, text: string, senderId: string): Promise<void> {
    try {
      const messagesRef = ref(this.db, `conversations/${conversationId}/messages`);
      const newMessageRef = push(messagesRef);

      const username = await this.authService.getUsername(senderId);
      await set(newMessageRef, {
        text,
        sender: username,
        timestamp: new Date().toISOString()
      });

      const messageId = newMessageRef.key;
      await updateDoc(doc(this.firestore, `conversations/${conversationId}`), { lastMessageId: messageId, lastMessage: text });

      const conversationDocRef = doc(this.firestore, `conversations/${conversationId}`);
      const conversationDoc = await getDoc(conversationDocRef);
      const conversationData = conversationDoc.data();
      if (conversationData) {
        const participants = Object.values<string>(conversationData['participants']);
        participants.forEach((participantId: string) => {
          if (participantId !== senderId) {
            this.incrementUnreadMessageCount(conversationId, participantId);
          }
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  async incrementUnreadMessageCount(conversationId: string, userId: string): Promise<void> {
    try {
      const conversationRef = doc(this.firestore, `conversations/${conversationId}`);
      await updateDoc(conversationRef, {
        [`unreadMessageCount.${userId}`]: increment(1)
      });
    } catch (error) {
      console.error('Error incrementing unread message count:', error);
      throw error;
    }
  }

  getMessages(conversationId: string, callback: Function): void {
    const messagesRef = ref(this.db, `conversations/${conversationId}/messages`);
    onValue(messagesRef, snapshot => {
      const messages = snapshot.val();
      const messagesArray = messages ? Object.keys(messages).map(key => ({ id: key, ...messages[key] })) : [];
      callback(messagesArray);
    });
  }

  updateLastSeen(conversationId: string, userId: string, lastMessageId: string): void {
    const conversationRef = doc(this.firestore, 'conversations', conversationId);
    updateDoc(conversationRef, {
      [`lastSeen.${userId}`]: lastMessageId
    });
  }

  updateLastSeenOnViewingNewConversation(conversationId: string): void {
    const currentUserUid = this.authService.getCurrentUserUid();
    if (currentUserUid) {
      const conversationRef = doc(this.firestore, 'conversations', conversationId);
      this.conversationSubscription = onSnapshot(conversationRef, (snapshot: DocumentSnapshot<any>) => {
        const conversationData = snapshot.data();
        if (conversationData) {
          const participants = Object.keys(conversationData.participants);
          const otherParticipant = participants.find(id => id !== currentUserUid);
          if (otherParticipant) {
            const lastMessageId = conversationData.lastMessageId || '';
            updateDoc(conversationRef, {
              [`lastSeen.${currentUserUid}`]: lastMessageId,
              [`unreadMessageCount.${currentUserUid}`]: 0
            });
          }
        }
      });
    }
  }

  unsubscribeFromConversationUpdates(): void {
    if (this.conversationSubscription) {
      this.conversationSubscription();
    }
  }

  // Récupérer lastSeen pour un utilisateur dans une conversation
  async getLastSeen(conversationId: string, userId: string): Promise<string> {
    const conversationDoc = await getDoc(doc(this.firestore, `conversations/${conversationId}`));
    const lastSeenData = conversationDoc.data()?.['lastSeen'];
    return lastSeenData ? lastSeenData[userId] || '' : '';
  }

  async getUnreadMessageCount(conversationId: string): Promise<number> {
    try {
      const currentUserUid = this.authService.getCurrentUserUid();
      if (!currentUserUid) {
        throw new Error('Current user not found');
      }

      // Step 1: Get the lastSeen timestamp from Firestore
      const lastSeenDoc = doc(this.firestore, `conversations/${conversationId}/lastSeen/${currentUserUid}`);
      const lastSeenSnapshot = await getDoc(lastSeenDoc);
      const lastSeenTimestamp = lastSeenSnapshot.data()?.['timestamp'] || 0;

      // Step 2: Get all messages from Realtime Database
      const messagesRef = ref(this.db, `/${conversationId}/messages`);
      const messagesSnapshot = await new Promise<any>((resolve, reject) => {
        onValue(messagesRef, (snapshot) => {
          resolve(snapshot);
        }, (error) => {
          reject(error);
        });
      });
      const messages = messagesSnapshot.val() || {};

      // Step 3: Compare timestamps to count unread messages
      let unreadMessageCount = 0;
      Object.values(messages).forEach((message: any) => {
        const messageTimestamp = message.timestamp || 0;
        if (messageTimestamp > lastSeenTimestamp) {
          unreadMessageCount++;
        }
      });

      return unreadMessageCount;
    } catch (error) {
      console.error('Error retrieving unread message count:', error);
      throw error;
    }
  }

  async getTotalUnreadMessageCount(): Promise<number> {
    try {
      const user = await this.authService.getCurrentUser();
      if (!user) {
        throw new Error('User not logged in');
      }

      const conversationsRef = ref(this.db, `users/${user.uid}/conversations`);
      const snapshot = await get(conversationsRef);

      const conversations = snapshot.val();
      if (!conversations) {
        return 0;
      }

      const unreadCountsPromises: Promise<number>[] = Object.keys(conversations).map(async (conversationId) => {
        const unreadCount = await this.getUnreadMessageCount(conversationId);
        return unreadCount;
      });

      const unreadCounts = await Promise.all(unreadCountsPromises);
      const totalUnreadCount = unreadCounts.reduce((acc, count) => acc + count, 0);

      return totalUnreadCount;
    } catch (error) {
      console.error('Error fetching total unread message count:', error);
      throw error;
    }
  }

}
