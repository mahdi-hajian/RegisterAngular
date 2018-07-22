import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../Services/user.service';
import { Subscription } from 'rxjs';
import { IuserConfirmEmail, IuserResetPassword } from '../../../Interface/iuser';
import { NotifierService } from 'angular-notifier';
import { NgForm } from '../../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute, private userService: UserService, private notifier: NotifierService ) { }

  header: IuserResetPassword = {UserName: '', Token: '', NewPassword: ''};
  ConfirmPasswordValidation: boolean = false ;
  userSubscription: Subscription;
  @ViewChild('ConfirmPassword') ConfirmPassword: ElementRef; 
  @ViewChild('Password') Password: ElementRef; 
  @ViewChild('ResetPasswordForm') ResetPasswordForm: NgForm;

  ngOnInit() {
        
    }
    OnResetPassword(){
      this.header.NewPassword = this.Password['viewModel'];
      try {
            this.userSubscription = this
            .activeRoute
            .queryParams.subscribe(
              (params: IuserResetPassword ) => {this.header.Token = params.Token, this.header.UserName = params.UserName});
              
              this.userService.ResetPassword(this.header).subscribe(
                (data: any) => {
                  if (data.succeeded == true) {
                    this.notifier.notify( 'success', 'گذرواژه شما با موفقیت تغییر کرد' )
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

  validatePassword(){
    if (this.Password['viewModel'] != this.ConfirmPassword['viewModel']) {
      this.ConfirmPasswordValidation = false;
    } else {
      this.ConfirmPasswordValidation = true;
    }
  }
  
}
