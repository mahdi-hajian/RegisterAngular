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
import { CookieService } from 'ngx-cookie-service';
// kookie
// npm install ngx-cookie-service --save
// 0.peovide in appModule
// 1.npm install ngx-cookie-service --save
// 2.add to your module: import { CookieService } from 'ngx-cookie-service';
// 3.inject it to your constructor.

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
    /* https://www.npmjs.com/package/angular-notifier */
    NotifierModule.withConfig({
      position: {
 
        horizontal: {
       
          /**
           * Defines the horizontal position on the screen
           * @type {'left' | 'middle' | 'right'}
           */
          position: 'right'
        }
      },
      behaviour: {

 /**
     * Defines the horizontal position on the screen
     * @type {'left' | 'middle' | 'right'}
     */
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
  providers: [CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
