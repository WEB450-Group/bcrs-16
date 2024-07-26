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
import { Component, OnInit} from '@angular/core';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/shared/auth.service';

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
  hideDropdownTimeout: any;

  constructor(private router: Router, private cookieService: CookieService, public authService: AuthService) {}
  
  //show dropdown on hover
  showDropdown() {
    clearTimeout(this.hideDropdownTimeout);
    this.dropdownVisible = true;
  }
  //hide dropdown with a timeout 
  hideDropdown() {
    this.hideDropdownTimeout = setTimeout(() => {
      this.dropdownVisible = false;
    }, 300);
  }
  //click dropdown event listener for mobile
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const targetElement = event.target as HTMLElement;
    if (this.dropdownVisible && !targetElement.closest('.logged-in-menu')) {
      this.dropdownVisible = false;
    }
  }

  ngOnInit(): void {
    // Get session_user
    this.isSignedIn = this.authService.isLoggedIn();
    console.log('Signed in as', this.appUser);
    console.log('session_user', this.appUser.firstName);

    // If signed in get/set session cookies so name can dynamically be displayed in nav
    this.appUser.firstName = this.authService.getFirstName();
    console.log('First Name:', this.appUser.firstName);

    // Get session_user role
    this.isAdmin = this.authService.getRole() === 'admin';
    console.log('isAdmin:', this.isAdmin);
  }

  // Get employee Id for the profile page
  getProfileLink(): string {
    console.log('Getting the profile page...');
    const employeeId = this.authService.getEmployeeId();
    console.log('Employee Id for Profile page', employeeId);
    return employeeId ? `/profile/${employeeId}` : '/not-found';
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