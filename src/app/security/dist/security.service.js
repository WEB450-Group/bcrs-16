"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SecurityService = void 0;
/*
============================================
; Title:  security.service.ts
; Author: Professor Krasso
; Date: 5. July, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Security Service
;===========================================
*/
var core_1 = require("@angular/core");
var SecurityService = /** @class */ (function () {
    function SecurityService(http) {
        this.http = http;
    }
    // findById API call
    SecurityService.prototype.findEmployeeById = function (employeeId) {
        return this.http.get("/api/employees/" + employeeId);
    };
    // Signin API call
    SecurityService.prototype.signIn = function (email, password) {
        return this.http.post('/api/security/signin', {
            email: email, password: password
        });
    };
    //Register API call
    SecurityService.prototype.register = function (employee) {
        return this.http.post('/api/security/register', employee);
    };
    //Verify email API call
    SecurityService.prototype.verifyEmail = function (email) {
        return this.http.post("/api/security/verify/employees/" + email, {});
    };
    // Verify security questions API call
    SecurityService.prototype.verifySecurityQuestions = function (email, securityQuestions) {
        return this.http.post('/api/security/verify/employees/' + email + '/security-questions', securityQuestions);
    };
    SecurityService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], SecurityService);
    return SecurityService;
}());
exports.SecurityService = SecurityService;
