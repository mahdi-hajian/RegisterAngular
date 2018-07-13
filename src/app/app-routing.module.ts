import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './Componenets/user/user.component';
import { SignUpComponent } from './componenets/user/sign-up/sign-up.component';
import { HomeComponent } from './Componenets/home/home.component';
import { SignInComponent } from './Componenets/user/sign-in/sign-in.component';

const routes: Routes = [
  {path:'', redirectTo: 'user', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
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