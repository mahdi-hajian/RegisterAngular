import { Component, OnInit, OnDestroy } from '@angular/core';
import { IuserConfirmEmail } from '../../../Interface/iuser';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { UserService } from '../../../Services/user.service';

@Component({
  selector: 'app-confirm-email-result',
  templateUrl: './confirm-email-result.component.html',
  styleUrls: ['./confirm-email-result.component.css']
})
export class ConfirmEmailResultComponent implements OnInit, OnDestroy {

  constructor(private activeRoute: ActivatedRoute, private userService: UserService ) { }

  user: IuserConfirmEmail = {
    UserName: '',
    Token: ''
};
result ;
userSubscription: Subscription;

  ngOnInit() {
        try {
            this.userSubscription = this
            .activeRoute
            .queryParams.subscribe(
              (params: IuserConfirmEmail ) => {this.user = params});
              
              this.userService.SetConfirmEmail(this.user).subscribe(
                (data: any) => {
                  if (data.succeeded == true) {
                    this.result = 'ایمیل شما با موفقیت تایید شد'
                  }else{
                    data.errors.forEach(element => {
                      this.result = element.description
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
