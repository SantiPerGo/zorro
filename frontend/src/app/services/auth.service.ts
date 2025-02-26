import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public jwtHelper: JwtHelperService) {}

  // Check whether the token is expired and return true or false
  public isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired( AuthService.getToken() );
  }

  public static getToken(): string | null {
    return sessionStorage.getItem('access_token');
  }
}
