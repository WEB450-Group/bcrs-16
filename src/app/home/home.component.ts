/*
============================================
; Title:  home.component.ts
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Home Component
;===========================================
*/

import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../shared/auth.service';

// imports statements
import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';

export interface AppUser {
  firstName: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  appUser: AppUser = {
    firstName: '',
  };
  constructor( private cookieService: CookieService, public authService: AuthService) {

  }
  ngOnInit(): void {
     // Get session_user
     this.isLoggedIn = this.authService.isLoggedIn();
     console.log('Signed in as', this.appUser);

     // If signed in get/set session cookies so name can dynamically be displayed in nav
     this.appUser.firstName = this.authService.getFirstName();
     console.log('First Name:', this.appUser.firstName);
  }
  @ViewChild('serviceCards') serviceCards!: ElementRef;

  scrollToServiceCards(event: Event) {
    event.preventDefault();
    this.serviceCards.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
