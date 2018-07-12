import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '../../../../../node_modules/@angular/forms';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  @ViewChild('userSignInForm') userSignInForm: NgForm;

  constructor() { }

  ngOnInit() {
  }

  resetForm(form?: NgForm){
    form.reset()
  }
  onLogin(){
    console.log(this.userSignInForm);
  }

}
