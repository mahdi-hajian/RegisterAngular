import { Component, OnInit, ViewChild } from '@angular/core';
import { Iuser } from '../../Interface/iuser';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: Iuser;
  // tslint:disable-next-line:max-line-length
  pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  constructor(private userService: UserService) { }
  @ViewChild('userRegistrationForm') userRegistrationForm: NgForm;
  ngOnInit() {
  }

  resetForm(form?: NgForm) {
    if ( form != null) {
      form.reset();
    }
  }
  onSubmit() {
    this.userService.registerUser(this.userRegistrationForm.value).subscribe(
      (data: any) => {
        if (data.succeeded == true) {
          console.log("true");
          
          // this.resetForm(this.userRegistrationForm);
        }else{
          data.errors.forEach(element => {
            console.log(element.code);
          });
        }
      }
    );
  }
}
