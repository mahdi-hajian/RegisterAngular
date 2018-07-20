import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { NotifierService } from 'angular-notifier';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(private loginService: UserService, private router: Router, private notifier: NotifierService) { }
  
  logOut() {
      localStorage.removeItem("UserSession");
      }

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
     Observable < boolean > | Promise < boolean > | boolean {
      let log = true;
      this.loginService.isLogin().subscribe(
        () => {
          true
        },
        () => {
          false
        }
      )
      return log;
  }
}