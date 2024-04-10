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

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path: 'top', component: CatalogueComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'game/:id', component: GameDetailsComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutingModule { }
