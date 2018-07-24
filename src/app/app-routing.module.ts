import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmEmailResultComponent } from './components/Confirmation/confirm-email-result/confirm-email-result.component';
import { AuthGuardService } from './Services/Guard/AuthGuard.service';
import { TestGuardComponent } from './components/test-guard/test-guard.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { SignInComponent } from './components/user/sign-in/sign-in.component';
import { SignUpComponent } from './Components/user/sign-up/sign-up.component';
import { ResetPasswordComponent } from './Components/Confirmation/reset-password/reset-password.component';
import { RequestResetPasswordComponent } from './Components/Confirmation/request-reset-password/request-reset-password.component';
import { ConfirmChangeEmailComponent } from './Components/Confirmation/confirm-change-email/confirm-change-email.component';


const routes: Routes = [
  {path:'', redirectTo: 'user', pathMatch: 'full'},
  { path: 'Account/ConfirmEmail', component: ConfirmEmailResultComponent },
  { path: 'Account/ConfirmChangeEmail', component: ConfirmChangeEmailComponent },
  { path: 'Account/ForgetPassword', component: ResetPasswordComponent},
  { path: 'Account/RequestForForgetPassword', component: RequestResetPasswordComponent},
  {path: 'TestGuard', component: TestGuardComponent, canActivate: [AuthGuardService]},
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
