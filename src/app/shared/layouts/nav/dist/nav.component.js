"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NavComponent = void 0;
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
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var NavComponent = /** @class */ (function () {
    function NavComponent(router, cookieService, authService) {
        this.router = router;
        this.cookieService = cookieService;
        this.authService = authService;
        this.menuVisible = false;
        this.dropdownVisible = false;
        this.appUser = {
            firstName: '',
            role: ''
        };
        this.isSignedIn = false;
        this.isAdmin = false;
    }
    //show dropdown on hover
    NavComponent.prototype.showDropdown = function () {
        clearTimeout(this.hideDropdownTimeout);
        this.dropdownVisible = true;
    };
    //hide dropdown with a timeout 
    NavComponent.prototype.hideDropdown = function () {
        var _this = this;
        this.hideDropdownTimeout = setTimeout(function () {
            _this.dropdownVisible = false;
        }, 300);
    };
    //click dropdown event listener for mobile
    NavComponent.prototype.handleClickOutside = function (event) {
        var targetElement = event.target;
        if (this.dropdownVisible && !targetElement.closest('.logged-in-menu')) {
            this.dropdownVisible = false;
        }
    };
    NavComponent.prototype.ngOnInit = function () {
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
    };
    // Get employee Id for the profile page
    NavComponent.prototype.getProfileLink = function () {
        console.log('Getting the profile page...');
        var employeeId = this.authService.getEmployeeId();
        console.log('Employee Id for Profile page', employeeId);
        return employeeId ? "/profile/" + employeeId : '/not-found';
    };
    // Sign out function
    NavComponent.prototype.signOut = function () {
        console.log('Removing session user from the cookie');
        this.cookieService.deleteAll();
        window.location.href = '/';
    };
    // Toggle menu for small screen
    NavComponent.prototype.toggleMenu = function () {
        this.menuVisible = !this.menuVisible;
    };
    // Dropdown toggle menu for isSignedIn
    NavComponent.prototype.toggleDropdown = function () {
        this.dropdownVisible = !this.dropdownVisible;
    };
    __decorate([
        core_2.HostListener('document:click', ['$event'])
    ], NavComponent.prototype, "handleClickOutside");
    NavComponent = __decorate([
        core_1.Component({
            selector: 'app-nav',
            templateUrl: './nav.component.html',
            styleUrls: ['./nav.component.scss']
        })
    ], NavComponent);
    return NavComponent;
}());
exports.NavComponent = NavComponent;
