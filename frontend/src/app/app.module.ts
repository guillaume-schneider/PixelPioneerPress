import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CarouselComponent } from './carousel/carousel.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { RoutingModule } from './routing/routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { GameCardComponent } from './game-card/game-card.component';
import { AuthService } from './auth.service';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
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

@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    FooterComponent,
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
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule

  ],
  providers: [AuthService,],
  bootstrap: [AppComponent]
})
export class AppModule {
  items$: Observable<any[]>;

  constructor(private firestore: AngularFirestore) {
    this.items$ = this.firestore.collection('items').valueChanges();
  }
}
