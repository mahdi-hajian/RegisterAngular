import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '../../../node_modules/@angular/common/http';
import { Iuser, IuserLogin, IuserConfirmEmail } from '../Interface/iuser';
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
      'UserName': user.UserName,
      'Token': user.Token
    });
     return this.http.get(this.url+"/Account/ConfirmEmail", {headers: header});
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
}
