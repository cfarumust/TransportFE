import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.auth.isLoggedIn().pipe(
      take(1),
      map(logged => {
        if (!logged) {
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
