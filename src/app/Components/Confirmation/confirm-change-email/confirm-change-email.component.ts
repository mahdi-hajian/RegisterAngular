import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../Services/user.service';
import { IuserConfirmEmail, IuserChangeEmail } from '../../../Interface/iuser';

@Component({
  selector: 'app-confirm-change-email',
  templateUrl: './confirm-change-email.component.html',
  styleUrls: ['./confirm-change-email.component.css']
})
export class ConfirmChangeEmailComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute, private userService: UserService) { }

  DetailsForChangeEmail: IuserChangeEmail = {
    NewEmail: '',
    UserId: ''
  };
  Token: string = '';
  result;
  userSubscription: Subscription;

  ngOnInit() {
    try {
      this.userSubscription = this
        .activeRoute
        .queryParams.subscribe(
        (params) => {
          this.DetailsForChangeEmail.UserId = params['UserId'], this.DetailsForChangeEmail.NewEmail = params['NewEmail'],
            this.Token = params['Token']});

      this.userService.ChangeNewEmail(this.DetailsForChangeEmail, this.Token).subscribe(
        (data: any) => {
          if (data.succeeded == true) {
            this.result = 'ایمیل شما با موفقیت تغییر کرد'
          } else {
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
