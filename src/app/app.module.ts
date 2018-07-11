import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NotifierModule  } from 'angular-notifier';

import { AppComponent } from './app.component';
import { SignUpComponent } from './componenets/sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent
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
         * Defines what happens when someone clicks on a notification
         * @type {'hide' | false}
         */
        onClick: false,
       
        /**
         * Defines what happens when someone hovers over a notification
         * @type {'pauseAutoHide' | 'resetAutoHide' | false}
         */
        onMouseover: 'pauseAutoHide',
       
        /**
         * Defines whether the dismiss button is visible or not
         * @type {boolean} 
         */
        showDismissButton: true,
       
        /**
         * Defines whether multiple notification will be stacked, and how high the stack limit is
         * @type {number | false}
         */
        stacking: 20
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
