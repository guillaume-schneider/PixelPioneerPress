import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CarouselComponent } from './carousel/carousel.component';
import { DivBehindComponent } from './div-behind/div-behind.component';
import { FooterComponent } from './footer/footer.component';
import { CardCarouselComponent } from './card-carousel/card-carousel.component';
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
import { CardComponent } from './card/card.component';
import { ErrorFormatPipe } from './error-format.pipe';
import { FirebaseSignUpErrorPipe } from './firebase-sign-up-error.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    DivBehindComponent,
    FooterComponent,
    CardCarouselComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    GameCardComponent,
    CatalogueComponent,
    CardComponent,
    ErrorFormatPipe,
    FirebaseSignUpErrorPipe
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
  items$: Observable<any[]>;

  constructor(private firestore: AngularFirestore) {
    this.items$ = this.firestore.collection('items').valueChanges();
  }
}
