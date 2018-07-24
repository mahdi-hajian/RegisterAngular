import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { NotifierService } from 'angular-notifier';
import { CookieService } from 'ngx-cookie-service'
import { UserService } from '../user.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuardService {
  constructor( private router: Router, private notifier: NotifierService, private Cookie: CookieService, private userService: UserService) { }
  
  logOut() {
      this.Cookie.delete("UserSession", '/');
      }

      
canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
     Observable < boolean > | Promise < boolean > | boolean {
      if (this.Cookie.get("UserSession") != "") {
      } 
      else {
        this.router.navigate(['/user/Login']);
          this.notifier.notify( 'error', "شما باید وارد سایت شوید" );
          return false;
      }
      this.userService.IsUserLogin().subscribe(
      (a) => {},
      (err) => {
        this.router.navigate(['/user/Login']),
        this.notifier.notify( 'error', "شما باید وارد سایت شوید" )}
      );
        return true;
      
  }
}
/////////////////////////////////////////////////////////////////////
export class UserGuardService {
  constructor(private router: Router, private notifier: NotifierService, private Cookie: CookieService, private userService: UserService) { }

  logOut() {
    this.Cookie.delete("UserSession", '/');
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
    if (this.Cookie.get("UserSession") != "") {
    }
    else {
      this.router.navigate(['/user/Login']);
      this.notifier.notify('error', "شما باید وارد سایت شوید");
      return false;
    }
    this.userService.IsUser().subscribe(
      (a) => { },
      (err) => {
        this.router.navigate(['/user/Login']),
          this.notifier.notify('error', "شما باید وارد سایت شوید")
      }
    );
    return true;

  }
}
/////////////////////////////////////////////////////////////////////
export class AdminGuardService {
  constructor(private router: Router, private notifier: NotifierService, private Cookie: CookieService, private userService: UserService) { }

  logOut() {
    this.Cookie.delete("UserSession", '/');
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
    if (this.Cookie.get("UserSession") != "") {
    }
    else {
      this.router.navigate(['/user/Login']);
      this.notifier.notify('error', "شما باید وارد سایت شوید");
      return false;
    }
    this.userService.IsAdmin().subscribe(
      (a) => { },
      (err) => {
        this.router.navigate(['/user/Login']),
          this.notifier.notify('error', "شما باید وارد سایت شوید")
      }
    );
    return true;

  }
}
/////////////////////////////////////////////////////////////////////
export class LeaderGuardService {
  constructor(private router: Router, private notifier: NotifierService, private Cookie: CookieService, private userService: UserService) { }

  logOut() {
    this.Cookie.delete("UserSession", '/');
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
    if (this.Cookie.get("UserSession") != "") {
    }
    else {
      this.router.navigate(['/user/Login']);
      this.notifier.notify('error', "شما باید وارد سایت شوید");
      return false;
    }
    this.userService.IsLeader().subscribe(
      (a) => { },
      (err) => {
        this.router.navigate(['/user/Login']),
          this.notifier.notify('error', "شما باید وارد سایت شوید")
      }
    );
    return true;

  }
}
 
      
