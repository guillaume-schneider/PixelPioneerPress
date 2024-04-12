import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path: 'top', component: CatalogueComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'game/:id', component: GameDetailsComponent},
  {path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard]},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'message', component: MessageComponent, canActivate: [AuthGuard]},
  {path: 'add-friend', component: AddFriendComponent, canActivate: [AuthGuard]},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutingModule { }
