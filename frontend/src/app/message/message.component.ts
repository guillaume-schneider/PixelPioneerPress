import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { MessageService } from '../message.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  conversationId: string = 'conversation1';
  messages: any[] = [];
  newMessage: string = '';
  loading: boolean = true;
  currentUser: User | null = null;

  constructor(
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().then(user => {
      this.currentUser = user;
      this.loadMessages();
    });
  }

  loadMessages() {
    this.loading = true;
    this.messageService.getMessages(this.conversationId).subscribe({
      next: (data: any[]) => {
        this.messages = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading messages:', error);
        this.loading = false;
      }
    });
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.messageService.sendMessage(this.conversationId, this.newMessage)
        .then(() => {
          this.newMessage = ''; // Clear the input field after sending
        })
        .catch(error => {
          console.error('Error sending message:', error);
        });
    }
  }
}
