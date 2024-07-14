"use strict";
/*
============================================
; Title:  home.component.ts
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Home Component
;===========================================
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomeComponent = void 0;
// imports statements
var core_1 = require("@angular/core");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(cookieService, authService) {
        this.cookieService = cookieService;
        this.authService = authService;
        this.isLoggedIn = false;
        this.appUser = {
            firstName: ''
        };
    }
    HomeComponent.prototype.ngOnInit = function () {
        // Get session_user
        this.isLoggedIn = this.authService.isLoggedIn();
        console.log('Signed in as', this.appUser);
        // If signed in get/set session cookies so name can dynamically be displayed in nav
        this.appUser.firstName = this.authService.getFirstName();
        console.log('First Name:', this.appUser.firstName);
    };
    HomeComponent.prototype.scrollToServiceCards = function (event) {
        event.preventDefault();
        this.serviceCards.nativeElement.scrollIntoView({ behavior: 'smooth' });
    };
    __decorate([
        core_1.ViewChild('serviceCards')
    ], HomeComponent.prototype, "serviceCards");
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.scss']
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
