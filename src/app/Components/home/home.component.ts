import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { NotifierService } from 'angular-notifier';
import { LoginGuardService } from '../../Services/Guard/AuthGuard.service';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { IuserChangePassword } from '../../Interface/iuser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private LogOutWithToken: LoginGuardService, private router: Router, private userService: UserService, private notifier: NotifierService) { }
  ConfirmPasswordValidation: boolean = false ;
  @ViewChild('CurrentPassword') CurrentPassword: ElementRef; 
  @ViewChild('NewPassword') NewPassword: ElementRef; 
  @ViewChild('ConfirmPassword') ConfirmPassword: ElementRef; 
  @ViewChild('ChangePasswordForm') ChangePasswordForm: NgForm;
  @ViewChild('NewEmail') NewEmail: ElementRef;
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

  ResetForm(form: NgForm){
    form.reset();
  }

  logOut(){
    this.LogOutWithToken.logOut();
    this.router.navigate(['/user/Login']);
  }

  onConfirmEmailAgain(){
    this.userService.SetConfirmEmailAgain().subscribe(
      (data: any) => {
        if (data.succeeded == true) {
          this.notifier.notify( 'success', 'لینک تایید ایمیلتان ارسال شد' )
        } else{
          data.errors.forEach(element => {
            this.notifier.notify( 'error', element.description )
          });
        }
      }
    )
  }

  validatePassword() {
    if (this.ConfirmPassword['viewModel'] != this.NewPassword['viewModel']) {
      this.ConfirmPasswordValidation = false;
    } else {
      this.ConfirmPasswordValidation = true;
    }
  }

  OnChangePassword(){
    
    var body: IuserChangePassword = {
      CurrentPassword: this.CurrentPassword['viewModel'],
      NewPassword: this.NewPassword['viewModel']
    };
    this.userService.ChangePassword(body).subscribe(
      (data: any) => {
        if (data.succeeded == true) {
          this.notifier.notify( 'success', 'گذرواژه ی شما با موفقیت تغییر کرد' );
          this.ResetForm(this.ChangePasswordForm);
          } else{
            data.errors.forEach(element => {
              this.notifier.notify( 'error', element.description )
            });
          }
        }
      )
  }
  
  OnNewEmail(){
    const newEmail: string = this.NewEmail.nativeElement.value;
    this.userService.SetNewEmail(newEmail).subscribe(
      (data: any) => {
        if (data.succeeded == true) {
          this.notifier.notify('success', 'یک ایمیل برای تایید ایمیلتان برایتان ارسال شد');
          this.ResetForm(this.ChangePasswordForm);
        } else {
          data.errors.forEach(element => {
            this.notifier.notify('error', element.description)
          });
        }
      }
    )
  }
}
