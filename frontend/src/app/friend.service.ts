import { Injectable } from '@angular/core';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, getFirestore, collection, doc, getDocs, getDoc, updateDoc, arrayUnion, query, where, setDoc } from '@angular/fire/firestore';
import { addDoc, increment } from 'firebase/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  private auth: Auth;
  private firestore: Firestore;

  constructor(private authService: AuthService) {
    this.auth = getAuth();
    this.firestore = getFirestore();
  }

  getAllUsers(): Observable<any[]> {
    return new Observable(observer => {
      onAuthStateChanged(this.auth, user => {
        if (user) {
          const usersCollectionRef = collection(this.firestore, 'users');
          getDocs(usersCollectionRef).then(querySnapshot => {
            const allUsers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const userDocRef = doc(this.firestore, `users/${user.uid}`);
            getDoc(userDocRef).then(userSnapshot => {
              const currentUserData = userSnapshot.data();
              const friends = currentUserData ? currentUserData['friends'] || [] : [];
              const filteredUsers = allUsers.filter(u => u.id !== user.uid && !friends.includes(u.id));
              observer.next(filteredUsers);
              observer.complete();
            }).catch(error => {
              observer.error('Error fetching current user data:' + error);
            });
          }).catch(error => {
            observer.error('Error fetching all users:' + error);
          });
        } else {
          observer.error('User not logged in');
          observer.complete();
        }
      });
    });
  }

  getFriends(userId: string): Observable<string[]> {
    const userDocRef = doc(this.firestore, `users/${userId}`);
    return from(getDoc(userDocRef)).pipe(
      map(snapshot => {
        const data = snapshot.data();
        return data ? data['friends'] as string[] : [];
      })
    );
  }

  addFriend(friendId: string): Observable<string> {
    return new Observable(observer => {
      const userUid = this.authService.getCurrentUserUid();
      if (!userUid) {
        observer.error('User not logged in');
        observer.complete();
        return;
      }

      this.updateCurrentUserFriendList(friendId).then(() => {
        this.updateFriendFriendList(userUid, friendId).then(() => {
          this.checkExistingConversation(userUid, friendId).then(conversationExists => {
            if (!conversationExists) {
              this.createConversation(userUid, friendId).then(() => {
                observer.next('Friend added and conversation created');
                observer.complete();
              }).catch(error => {
                observer.error('Failed to create conversation: ' + error);
              });
            } else {
              observer.next('Friend added, conversation already exists');
              observer.complete();
            }
          }).catch(error => {
            observer.error('Failed to check existing conversations: ' + error);
          });
        }).catch(error => {
          observer.error('Failed to add friend to friend\'s list: ' + error);
        });
      }).catch(error => {
        observer.error('Failed to add friend to user\'s list: ' + error);
      });
    });
  }

  private async updateCurrentUserFriendList(friendId: string): Promise<void> {
    const userUid = this.authService.getCurrentUserUid();
    const userDocRef = doc(this.firestore, `users/${userUid}`); // Utilisez 'doc' ici au lieu de 'collection'
    await updateDoc(userDocRef, { friends: arrayUnion(friendId) });
  }

  private async updateFriendFriendList(userId: string, friendId: string): Promise<void> {
    const friendDocRef = doc(this.firestore, `users/${friendId}`); // Utilisez 'doc' ici au lieu de 'collection'
    await updateDoc(friendDocRef, { friends: arrayUnion(userId) });
  }

  private async checkExistingConversation(userId: string, friendId: string): Promise<boolean> {
    const convQuery = query(collection(this.firestore, 'conversations'),
                            where('participants', 'in', [[userId, friendId], [friendId, userId]]));
    const snapshot = await getDocs(convQuery);
    return !snapshot.empty;
  }

  private async createConversation(userId: string, friendId: string): Promise<string> {
    const conversationRef = collection(this.firestore, 'conversations');
    const newConversation = await addDoc(conversationRef, {
      participants: [userId, friendId],
      messages: [],
      createdAt: new Date()
    });

    const userConversationRef = doc(this.firestore, `users/${userId}/conversations/${newConversation.id}`);
    const friendConversationRef = doc(this.firestore, `users/${friendId}/conversations/${newConversation.id}`);
    await setDoc(userConversationRef, { lastMessageId: null });
    await setDoc(friendConversationRef, { lastMessageId: null });

    return newConversation.id;
  }

}
