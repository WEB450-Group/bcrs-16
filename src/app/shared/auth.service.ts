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
    const sessionUser = this.cookieService.get('session_user');
    if(!sessionUser) {
      return '';
    }

    try {
      const appUser = JSON.parse(sessionUser);
      return appUser.firstName || '';
    } catch (err) {
      console.error("Error parsing session_user cookie: ", err);
      return '';
    }
  }

  getRole(): string {
    // Retrieve the user's role from the session_role cookie
    const appUser = JSON.parse(this.cookieService.get('session_user'  || ''));
    return appUser.role || '';
  }
}