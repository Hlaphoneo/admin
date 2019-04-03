import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return new Promise<boolean>((resolve,reject)=>{
        this.auth.loggedin().then((state)=>{          
          if(state){
            console.log(state);
            
            console.log("active");
            
            resolve(true)
          }else{
            console.log(false);
            this.router.navigate(['/login']);
            resolve(false)
          }
        }).catch((error)=>{
          this.router.navigate(['/login']);
          resolve(false)
        })
      })
  }
}
