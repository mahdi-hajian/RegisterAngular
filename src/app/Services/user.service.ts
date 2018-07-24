import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '../../../node_modules/@angular/common/http';
import { Iuser, IuserLogin, IuserConfirmEmail, IuserResetPassword, IuserChangePassword, IuserChangeEmail } from '../Interface/iuser';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from '../../../node_modules/rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  // tslint:disable-next-line:quotemark
  url = "http://localhost:60380/api";

  constructor(private http: HttpClient, private cookieService: CookieService) {
   }

   registerUser(user: Iuser) {
    const body: Iuser = {
      UserName: user.UserName,
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName,
    };
    return this.http.post(this.url+"/Account/Register", body);
   }

   loginUser(user: IuserLogin, Ip:string){
    const body: IuserLogin = {
      UserName: user.UserName,
      Password: user.Password,
      Ip: Ip
    };
    return this.http.post(this.url+"/Account/Login", body);
   }
   
  GetIpAddress(){
    return this.http.get("https://api.ipify.org?format=json");
  }

  SetConfirmEmail(user: IuserConfirmEmail){
    const header = new HttpHeaders({
      'Token': user.Token
    });
    return this.http.get(this.url + "/Account/ConfirmEmail?userId=" + user.UserId, { headers: header });
  }

  SetConfirmEmailAgain(){
    const header = new HttpHeaders({
      'Authorization': "bearer "+this.cookieService.get("UserSession")
    });
    return this.http.get(this.url+"/Account/ConfirmEmailAgain",{headers: header})
  }

  ResetPassword(body: IuserResetPassword, Token: string) {
    const header = new HttpHeaders({
      'Token': Token,
    });
    return this.http.post(this.url + "/Account/ForgetPassword",body , { headers: header });
  }

  RequestResetPassword(email: string){
    return this.http.get(this.url + "/Account/RequestForForgetPassword?email=" + email);
  }

  IsUserLogin(){
    const header = new HttpHeaders({
      'Authorization': "bearer "+this.cookieService.get("UserSession")
    });
     return this.http.get(this.url+"/Account/IsUserLogin", {headers: header});
  }

  GetUserClaim(){
    const header = new HttpHeaders({
      'Authorization': "bearer "+this.cookieService.get("UserSession")
    });
     return this.http.get(this.url+"/Account/GetDetails", {headers: header});
  }

  ChangePassword(input: IuserChangePassword){
    const header = new HttpHeaders({
      'Authorization': "bearer "+this.cookieService.get("UserSession")
    });
    const body: IuserChangePassword = {
      CurrentPassword: input.CurrentPassword,
      NewPassword: input.NewPassword
    };
     return this.http.post(this.url+"/Account/ChangePassword", body, {headers: header});
  }

  SetNewEmail(NewEmail: string){
    const header = new HttpHeaders({
      'Authorization': "bearer "+this.cookieService.get("UserSession")
    });
    return this.http.get(this.url + "/Account/RequestChangeEmail?NewEmail=" + NewEmail, {headers: header});
  }

  ChangeNewEmail(input: IuserChangeEmail, Token: string) {
    const header = new HttpHeaders({
      'Token': Token
    });
    const body: IuserChangeEmail = {
      UserId: input.UserId,
      NewEmail: input.NewEmail
    };
    return this.http.post(this.url + "/Account/ChangeEmail", body , { headers: header });
  }
}
