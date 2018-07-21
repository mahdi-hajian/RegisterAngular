import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '../../../../../node_modules/@angular/forms';
import { UserService } from '../../../Services/user.service';
import { NotifierService } from '../../../../../node_modules/angular-notifier';
import { Iuser } from '../../../Interface/iuser';
import { Router } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: Iuser;
  // tslint:disable-next-line:max-line-length
  pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  constructor(private userService: UserService, private notifier: NotifierService, private router: Router ) { }
  
  @ViewChild('userRegistrationForm') userRegistrationForm: NgForm;
  ngOnInit() {
  }

  resetForm(form?: NgForm) {
    if ( form != null) {
      form.reset();
    }
  }
  // npm install angular-notifier
  onSubmit() {
    
    this.userService.registerUser(this.userRegistrationForm.value).subscribe(
      (data: any) => {
        if (data.succeeded == true) {
          this.notifier.notify( 'success', 'شما با موفقیت ثبت نام کردید' );
          this.resetForm(this.userRegistrationForm);          
          this.router.navigate(['/user/Login']);
        }else{
          data.errors.forEach(element => {
            this.notifier.notify( 'error', element.description );
          });
        }
      }
    );
  }
}
