import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { CatalogueComponent } from '../catalogue/catalogue.component';
import { ProfileComponent } from '../profile/profile.component';
import { GameDetailsComponent } from '../game-details/game-details.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { MessageComponent } from '../message/message.component';
import { AddFriendComponent } from '../add-friend/add-friend.component';
import { WishlistComponent } from '../wishlist/wishlist.component';
import { AuthGuard } from '../auth.guard';
import { WelcomeComponent } from '../welcome/welcome.component';
import { HomeGuard } from '../home.guard';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { TopComponent } from '../top/top.component';
import { MessagesComponent } from '../messages/messages.component';
import { ConversationComponent } from '../conversation/conversation.component';
import { ReverseAuthGuard } from '../reverse-auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/redirect', pathMatch: 'full' },
  {path: 'redirect', component: HomeComponent, canActivate: [HomeGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'welcome', component: WelcomeComponent, canActivate: [ReverseAuthGuard]},
  {path: 'top', component: TopComponent},
  {path: 'login', component: LoginComponent, canActivate: [ReverseAuthGuard]},
  {path: 'signup', component: SignupComponent, canActivate: [ReverseAuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'game/:id', component: GameDetailsComponent},
  {path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard]},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'message', component: MessageComponent, canActivate: [AuthGuard]},
  { path: 'conversation/:id', component: ConversationComponent },
  {path: 'messages', component: MessagesComponent, canActivate: [AuthGuard]},
  {path: 'add-friend', component: AddFriendComponent, canActivate: [AuthGuard]},
  {path: 'search-results', component: SearchResultsComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutingModule { }
