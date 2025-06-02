import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {jwtDecode} from 'jwt-decode';

interface JwtPayload {
  role: string;
  // puedes agregar más campos si tienes en el token
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    let userRole = '';

    try {
      const decodedToken = jwtDecode<JwtPayload>(token);
      userRole = decodedToken.role;
    } catch (error) {
      console.error('Token inválido', error);
      this.router.navigate(['/login']);
      return false;
    }

    const expectedRoles = route.data['roles'] as Array<string>;

    if (expectedRoles && !expectedRoles.includes(userRole)) {
      this.router.navigate(['/unauthorized']);
      return false;
    }

    return true;
  }
}
