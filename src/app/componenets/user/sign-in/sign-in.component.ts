import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../Services/user.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  @ViewChild('userSignInForm') userSignInForm: NgForm;

  constructor(private userService: UserService, private notifier: NotifierService, private route: Router, private Cookie: CookieService) { }

  ngOnInit() {
  }

  resetForm(form?: NgForm){
    form.reset()
  }

  onLogin(){
    
    this.userService.loginUser(this.userSignInForm.value).subscribe((c) => {
       this.notifier.notify( 'success', c["message"] ),
       this.Cookie.set("UserSession", c["token"], 1, '/'),
       this.route.navigate(['/home'])
      },
     () => {this.notifier.notify( 'error', "نام کاربری یا پسورد شما اشتباه است" )}
  );
  }
}