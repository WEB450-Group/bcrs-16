/*
============================================
; Title:  nav.component.ts
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Nav Component
;===========================================
*/
// imports statements
import {
  Component,
  OnInit
} from '@angular/core';
import {
  HostListener
} from '@angular/core';
import {
  Router,
  RouterModule
} from '@angular/router';
import {
  CookieService
} from 'ngx-cookie-service';
import {
  AuthService
} from 'src/app/shared/auth.service';

export interface AppUser {
  firstName: string;
  role: string;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],

})
export class NavComponent implements OnInit {
  menuVisible: boolean = false;
  dropdownVisible: boolean = false;
  appUser: AppUser = {
    firstName: '',
    role: ''
  };
  isSignedIn: boolean = false;
  isAdmin: boolean = false;

  //HostListener decorator to listen for click events on the document or body, and then checking whether the target of the click is outside the specified element.  https://medium.com/@garcia.alberto.4.2012/listening-to-a-click-outside-a-div-in-angular-81f988c88f7f
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const targetElement = event.target as HTMLElement;
    if (this.dropdownVisible && !targetElement.closest('.logged-in-menu')) {
      this.dropdownVisible = false;
    }
  }

  constructor(private cookieService: CookieService, public authService: AuthService) {}
  ngOnInit(): void {
    // Get session_user  
    this.isSignedIn = this.authService.isLoggedIn();
    console.log('Signed in as', this.appUser);
    console.log('session_user', this.appUser.firstName);
    // Get session_user role
    this.appUser.firstName = JSON.parse(this.authService.getFirstName());
    // If signed in get/set session cookies so name can dynamically be displayed in nav
    this.isAdmin = JSON.parse(this.authService.getRole()) === 'admin';
    console.log('First Name:', this.appUser.firstName);
    console.log('isAdmin:', this.isAdmin);
  }

  // Sign out function
  signOut() {
    console.log('Removing session user from the cookie');
    this.cookieService.deleteAll();
    window.location.href = '/';
  }

  // Toggle menu for small screen
  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  // Dropdown toggle menu for isSignedIn
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }
}