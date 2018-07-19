import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { IsLoginService } from './IsLogin.service';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

constructor(private loginService: IsLoginService, private router: Router, private notifier: NotifierService) { }

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
     Observable < boolean > | Promise < boolean > | boolean {
       this.loginService.CheckToken();
      return this.loginService.isAthenticated().then(
        (auth: boolean) => {
          if (auth) {
            return true;
          } else {
            this.notifier.notify( 'error', "سطح دسترسی شما کم است" )
            this.router.navigate(['/user/Login']);
            return false;
          }
        }
      );
  }
}
