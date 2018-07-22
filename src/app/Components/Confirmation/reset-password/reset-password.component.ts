import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../Services/user.service';
import { Subscription } from 'rxjs';
import { IuserConfirmEmail, IuserReasetPassword } from '../../../Interface/iuser';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute, private userService: UserService, private notifier: NotifierService ) { }

  header: IuserReasetPassword = {NewPassword: '', UserName: '', Token: ''};
result ;
userSubscription: Subscription;

  ngOnInit() {
        try {
            this.userSubscription = this
            .activeRoute
            .queryParams.subscribe(
              (params: IuserConfirmEmail ) => {this.header.Token = params.Token, this.header.UserName = params.UserName});
              
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
    
    // نابود کردن اسینکرون بالا
    ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
