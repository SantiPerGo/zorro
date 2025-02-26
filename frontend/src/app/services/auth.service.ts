import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {}

  // Check whether the token is expired and return true or false
  public isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired( AuthService.getToken() );
  }

  public static getToken(): string | null {
    return sessionStorage.getItem('access_token');
  }
  
  public static getUserId(): string | null {
    return sessionStorage.getItem('user_id');
  }

  public closeSession() {
    sessionStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
}
