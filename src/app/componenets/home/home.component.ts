import { Component, OnInit } from '@angular/core';
import { IsLoginService } from '../../Services/Guard/IsLogin.service';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private LogOutWithToken: IsLoginService, private router: Router, private userService: UserService, private notifier: NotifierService) { }

  userClaims;
  ngOnInit() {
    this.userService.GetUserClaim().subscribe(
      (a) => {this.userClaims = a
      },
      (err) => {this.router.navigate(['/user/Login']),
      this.notifier.notify( 'error', "شما به این قسمت دسترسی ندارید" )
    }
    )
  }

  logOut(){
    this.LogOutWithToken.logOut();

    this.router.navigate(['/user/Login']);
  }



}
