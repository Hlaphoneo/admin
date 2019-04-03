import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router) {

  }

  //if the user is authenticated redirect them to home page
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return new Promise<boolean>((resolve,reject)=>{
        this.auth.loggedin().then((state)=>{          
          if(state){
            resolve(false);
            this.router.navigate(['/home']);
          }else{
            resolve(true)
          }
        }).catch((error)=>{
          resolve(true)
        })
      })
  }
}
