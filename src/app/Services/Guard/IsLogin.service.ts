import { Injectable } from '@angular/core';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoginService {

constructor(private service: UserService) { }

loggedIn = true;
CheckToken(){
    if (localStorage.getItem("UserSession")) {
        this.logIn();
    }
    else{
        this.logOut();
    }
}
isAthenticated() {
    const promise = new Promise((resolve, reject) => {
        resolve(this.loggedIn);
    });
    return promise;
}

logIn(){
    this.loggedIn = true;
}

logOut() {
    this.loggedIn = false;
    localStorage.removeItem("UserSession");
    }

}
