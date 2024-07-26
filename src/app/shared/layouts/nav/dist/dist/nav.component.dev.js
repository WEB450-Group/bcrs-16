"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
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

var NavComponent =
/** @class */
function () {
  function NavComponent(router, cookieService, authService, el, renderer) {
    this.router = router;
    this.cookieService = cookieService;
    this.authService = authService;
    this.el = el;
    this.renderer = renderer;
    this.menuVisible = false;
    this.dropdownVisible = false;
    this.appUser = {
      firstName: '',
      role: ''
    };
    this.isSignedIn = false;
    this.isAdmin = false;
  } //show drop down


  NavComponent.prototype.handleMouseEnter = function () {
    this.dropdownVisible = true;
  }; //hide dropdown


  NavComponent.prototype.handleMouseLeave = function () {
    this.dropdownVisible = false;
  }; //click dropdown event listener 


  NavComponent.prototype.handleClickOutside = function (event) {
    var targetElement = event.target;

    if (this.dropdownVisible && !targetElement.closest('.logged-in-menu')) {
      this.dropdownVisible = false;
    }
  };

  NavComponent.prototype.ngOnInit = function () {
    var _this = this;

    // Get session_user
    this.isSignedIn = this.authService.isLoggedIn();
    console.log('Signed in as', this.appUser);
    console.log('session_user', this.appUser.firstName); // If signed in get/set session cookies so name can dynamically be displayed in nav

    this.appUser.firstName = this.authService.getFirstName();
    console.log('First Name:', this.appUser.firstName); // Get session_user role

    this.isAdmin = this.authService.getRole() === 'admin';
    console.log('isAdmin:', this.isAdmin); // Add event listeners for mouse enter and leave on the logged-in menu

    var loggedInMenu = this.el.nativeElement.querySelector('.logged-in-menu');

    if (loggedInMenu) {
      this.renderer.listen(loggedInMenu, 'mouseenter', function () {
        return _this.handleMouseEnter();
      });
      this.renderer.listen(loggedInMenu, 'mouseleave', function () {
        return _this.handleMouseLeave();
      });
    }
  }; // Get employee Id for the profile page


  NavComponent.prototype.getProfileLink = function () {
    console.log('Getting the profile page...');
    var employeeId = this.authService.getEmployeeId();
    console.log('Employee Id for Profile page', employeeId);
    return employeeId ? "/profile/" + employeeId : '/not-found';
  }; // Sign out function


  NavComponent.prototype.signOut = function () {
    console.log('Removing session user from the cookie');
    this.cookieService.deleteAll();
    window.location.href = '/';
  }; // Toggle menu for small screen


  NavComponent.prototype.toggleMenu = function () {
    this.menuVisible = !this.menuVisible;
  }; // Dropdown toggle menu for isSignedIn


  NavComponent.prototype.toggleDropdown = function () {
    this.dropdownVisible = !this.dropdownVisible;
  };

  __decorate([core_2.HostListener('document:click', ['$event'])], NavComponent.prototype, "handleClickOutside");

  NavComponent = __decorate([core_1.Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
  })], NavComponent);
  return NavComponent;
}();

exports.NavComponent = NavComponent;