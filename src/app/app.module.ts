import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NotifierModule  } from 'angular-notifier';

import { AppComponent } from './app.component';
import { SignUpComponent } from './componenets/user/sign-up/sign-up.component';
import { AppRoutingModule } from './/app-routing.module';
import { UserComponent } from './Componenets/user/user.component';
import { SignInComponent } from './Componenets/user/sign-in/sign-in.component';
import { HomeComponent } from './Componenets/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    UserComponent,
    SignInComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NotifierModule.withConfig({
      behaviour: {
 
        /**
         * Defines whether each notification will hide itself automatically after a timeout passes
         * @type {number | false}
         */
        autoHide: 10000,
       
        /**
         * Defines whether multiple notification will be stacked, and how high the stack limit is
         * @type {number | false}
         */
        stacking: 20
      }
    }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
