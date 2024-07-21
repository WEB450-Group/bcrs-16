"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthService = void 0;
/*
============================================
; Title:  auth.service.ts
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Auth Service
;===========================================
*/
var core_1 = require("@angular/core");
var AuthService = /** @class */ (function () {
    function AuthService(cookieService) {
        this.cookieService = cookieService;
    }
    AuthService.prototype.isLoggedIn = function () {
        // Check if the session_name cookie is set
        return this.cookieService.check('session_user');
    };
    AuthService.prototype.getFirstName = function () {
        // Retrieve the user's first name from the session_name cookie
        var sessionUser = this.cookieService.get('session_user');
        if (!sessionUser) {
            return '';
        }
        try {
            var appUser = JSON.parse(sessionUser);
            return appUser.firstName || '';
        }
        catch (err) {
            console.error("Error parsing session_user cookie: ", err);
            return '';
        }
    };
    AuthService.prototype.getRole = function () {
        // Retrieve the user's role from the session_role cookie
        var sessionUser = this.cookieService.get('session_user');
        if (!sessionUser) {
            return '';
        }
        try {
            var appUser = JSON.parse(sessionUser);
            return appUser.role || '';
        }
        catch (err) {
            console.error("Error parsing session_user cookie: ", err);
            return '';
        }
    };
    AuthService.prototype.setEmployeeId = function (employeeId) {
        this.cookieService.set('employee_id', employeeId);
    };
    AuthService.prototype.getEmployeeId = function () {
        return this.cookieService.get('employee_id');
    };
    AuthService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
