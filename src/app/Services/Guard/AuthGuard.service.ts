import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { NotifierService } from 'angular-notifier';
import { CookieService } from 'ngx-cookie-service'


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor( private router: Router, private notifier: NotifierService, private Cookie: CookieService) { }
  
  logOut() {
      this.Cookie.delete("UserSession", '/');
      }

      
canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
     Observable < boolean > | Promise < boolean > | boolean {
      
      if (this.Cookie.get("UserSession") != "") {
        return true;
      } 
      else {
        this.router.navigate(['/user/Login']);
          this.notifier.notify( 'error', "شما باید وارد سایت شوید" );
          return false;
      }
       
  }
}