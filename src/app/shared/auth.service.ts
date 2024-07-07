/*
============================================
; Title:  auth.service.ts
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Auth Service
;===========================================
*/
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private cookieService: CookieService) {}

  isLoggedIn(): boolean {
    // Check if the session_name cookie is set
    return this.cookieService.check('session_user');
  }

  getFirstName(): string {
    // Retrieve the user's first name from the session_name cookie
    const appUser = JSON.parse(this.cookieService.get('session_user'));
    return appUser.firstName || '';
  }

  getRole(): string {
    // Retrieve the user's role from the session_role cookie
    const appUser = JSON.parse(this.cookieService.get('session_user'));
    return appUser.role || '';
  }
}