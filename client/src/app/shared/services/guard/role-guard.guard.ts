import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RoleGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (localStorage.getItem('role')) {
      const role = localStorage.getItem('role');
      const expectedRoles = next.data.roles;
      if (expectedRoles.includes(role)) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false
      }
    } else {
      this.router.navigate(['/login']);
      return false
    }
  }}
