import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { AuthService } from '../auth.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  conversationId: string = 'conversation1'; // ID de la conversation (peut être dynamique)
  messages: any[] = [];
  newMessage: string = '';
  loading: boolean = true;
  currentUser: firebase.User | null = null; // Utilisateur actuellement connecté

  constructor(private messageService: MessageService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().then(user => {
      this.currentUser = user;
      this.loadMessages();
    });
  }

  loadMessages() {
    this.loading = true;
    this.messageService.getMessages(this.conversationId).subscribe((data: any[]) => {
      this.messages = data;
      this.loading = false;
    });
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.messageService.sendMessage(this.conversationId, this.newMessage)
        .then(() => {
          this.newMessage = ''; // Effacer le champ de saisie après l'envoi
        })
        .catch(error => {
          console.error('Erreur lors de l\'envoi du message :', error);
        });
    }
  }
}
