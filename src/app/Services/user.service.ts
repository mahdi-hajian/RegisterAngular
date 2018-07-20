import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '../../../node_modules/@angular/common/http';
import { Iuser, IuserLogin } from '../Interface/iuser';
import { CookieService } from 'ngx-cookie-service';


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

   loginUser(user: IuserLogin){
    return this.http.post(this.url+"/Account/Login", user);
   }

   isLogin(){
    const header = new HttpHeaders({
      'Authorization': "bearer "+this.cookieService.get("UserSession")
    });
    return this.http.get(this.url+"/Account/IsLogin", {headers: header});
   }

    GetUserClaim(){
      const header = new HttpHeaders({
        'Authorization': "bearer "+this.cookieService.get("UserSession")
      });
      return this.http.get(this.url+"/Account/GetDetails", {headers: header});
    }
}
