import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { NotifierService } from 'angular-notifier';
import { AuthGuardService } from '../../Services/Guard/AuthGuard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private LogOutWithToken: AuthGuardService, private router: Router, private userService: UserService, private notifier: NotifierService) { }

  userClaims;
  ngOnInit() {
    this.userService.GetUserClaim().subscribe(
      (a) => {this.userClaims = a
      },
      (err) => {
        if (err.status == 403) {
          this.router.navigate(['/user/Login']),
          this.notifier.notify( 'error', "شما به این قسمت دسترسی ندارید" )
        }
        else if (err.status == 401) {
          this.router.navigate(['/user/Login']),
          this.notifier.notify( 'error', "شما باید ابتدا وارد سایت شوید" )
        }
        else
          this.router.navigate(['/user/Login'])
      }
    )
  }

  logOut(){
    this.LogOutWithToken.logOut();
    this.router.navigate(['/user/Login']);
  }
}
