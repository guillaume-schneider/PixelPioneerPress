import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { RoutingModule } from './routing/routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { GameCardComponent } from './game-card/game-card.component';
import { AuthService } from './auth.service';

import { environment } from '../environments/environment';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { ErrorFormatPipe } from './error-format.pipe';
import { FirebaseSignUpErrorPipe } from './firebase-sign-up-error.pipe';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { GameDetailsComponent } from './game-details/game-details.component';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LargeNumberPipe } from './large-number.pipe';
import { RoundPipe } from './round.pipe';
import { MessageComponent } from './message/message.component';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { FriendsListComponent } from './friends-list/friends-list.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule} from '@angular/material/core';
import { HomeCardComponent } from './home-card/home-card.component';

import { MatCardModule } from '@angular/material/card';
import { WelcomeComponent } from './welcome/welcome.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { TopComponent } from './top/top.component';
import { MessagesComponent } from './messages/messages.component';
import { ConversationComponent } from './conversation/conversation.component';
import { NewConversationComponent } from './new-conversation/new-conversation.component';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    GameCardComponent,
    CatalogueComponent,
    ErrorFormatPipe,
    FirebaseSignUpErrorPipe,
    ProfileComponent,
    GameDetailsComponent,
    AuthDialogComponent,
    ResetPasswordComponent,
    LargeNumberPipe,
    RoundPipe,
    MessageComponent,
    AddFriendComponent,
    FriendsListComponent,
    WishlistComponent,
    HomeCardComponent,
    WelcomeComponent,
    SearchBarComponent,
    SearchResultsComponent,
    TopComponent,
    MessagesComponent,
    ConversationComponent,
    NewConversationComponent,
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatRippleModule,
    MatCardModule,

    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
  ],
  providers: [AuthService,],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
  }
}
