import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './Componenets/user/user.component';
import { SignUpComponent } from './componenets/user/sign-up/sign-up.component';
import { HomeComponent } from './Componenets/home/home.component';
import { SignInComponent } from './Componenets/user/sign-in/sign-in.component';
import { AuthGuardService } from './Services/Guard/AuthGuard.service';
import { ConfirmEmailResultComponent } from './componenets/confirm-email-result/confirm-email-result.component';

const routes: Routes = [
  {path:'', redirectTo: 'user', pathMatch: 'full'},
  {path: 'ConfirmEmail', component: ConfirmEmailResultComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
  {path:'user', component: UserComponent, children: [
    {path:'SingUp', component: SignUpComponent},
    {path:'', redirectTo: 'SingUp', pathMatch: 'full'},
    {path:'Login', component: SignInComponent}
  ]},
  {path: '**', redirectTo: 'user'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}