/*
============================================
; Title:  footer.component.ts
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Footer Component
;===========================================
*/

// imports statements
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export interface AppUser {
  fullName: string;
  firstName: string;
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  appUser: AppUser;
  isSignedIn: boolean;
  
  constructor(private cookieService: CookieService, private router: Router) {
    // Get session user
    this.isSignedIn = this.cookieService.get('session_user') ? true : false;
    this.appUser = {} as AppUser;
  }
}
