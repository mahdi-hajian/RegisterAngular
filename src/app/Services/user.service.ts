import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '../../../node_modules/@angular/common/http';
import { Iuser, IuserLogin } from '../Interface/iuser';
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
   
   isLogin(){
    const header = new HttpHeaders({
      'Authorization': "bearer "+this.cookieService.get("UserSession")
    });
    this.http.get(this.url+"/Account/IsLogin", {headers: header});
    
  }

  GetIpAddress(){
    return this.http.get("https://api.ipify.org?format=json");
  }

  SetConfirmEmail(){
    
  }

  GetUserClaim(){
    const header = new HttpHeaders({
      'Authorization': "bearer "+this.cookieService.get("UserSession")
    });
     return this.http.get(this.url+"/Account/GetDetails", {headers: header});
  }
}
