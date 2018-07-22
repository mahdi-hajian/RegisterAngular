import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { UserService } from '../../../Services/user.service';

@Component({
  selector: 'app-request-reset-password',
  templateUrl: './request-reset-password.component.html',
  styleUrls: ['./request-reset-password.component.css']
})
export class RequestResetPasswordComponent implements OnInit, OnDestroy {
  pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private activeRoute: ActivatedRoute, private userService: UserService, private notifier: NotifierService ){}

  userSubscription: Subscription;
  @ViewChild('email') email: ElementRef; 

  ngOnInit() {
        
    }
    OnRequestResetPassword(){
      try {
        this.userSubscription = this.userService.RequestResetPassword(this.email['viewModel']).subscribe(
          (data: any) => {
            if (data.succeeded == true) {
              this.notifier.notify( 'success', 'ایمیل بازیابی گذرواژه برای شما ارسال شد' )
            } else{
              data.errors.forEach(element => {
                this.notifier.notify( 'error', element.description )
              });
            }
          }
        )
        } catch (error) {
          
        }
    }

    ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
