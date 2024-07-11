"use strict";
/*
============================================
; Title:  security-routing.module.ts
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Security Routing Module
;===========================================
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SecurityRoutingModule = void 0;
// imports statements
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var security_component_1 = require("./security.component");
var signin_component_1 = require("./signin/signin.component");
var registration_component_1 = require("./registration/registration.component");
var password_reset_component_1 = require("./password-reset/password-reset.component");
var verify_email_component_1 = require("./verify-email/verify-email.component");
var verify_questions_component_1 = require("./verify-questions/verify-questions.component");
var routes = [
    {
        path: '',
        component: security_component_1.SecurityComponent,
        title: 'BCRS: Security',
        children: [
            {
                path: 'signin',
                component: signin_component_1.SigninComponent,
                title: 'BCRS: Login'
            },
            {
                path: 'registration',
                component: registration_component_1.RegistrationComponent,
                title: 'BCRS: Registration'
            },
            {
                path: 'verify-email',
                component: verify_email_component_1.VerifyEmailComponent,
                title: 'BCRS: Verify Email'
            },
            {
                path: 'password-reset',
                component: password_reset_component_1.PasswordResetComponent,
                title: 'BCRS: Password Reset'
            },
            {
                path: 'verify-questions',
                component: verify_questions_component_1.VerifyQuestionsComponent,
                title: 'BCRS: Verify Security Questions'
            }
        ]
    }
];
var SecurityRoutingModule = /** @class */ (function () {
    function SecurityRoutingModule() {
    }
    SecurityRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], SecurityRoutingModule);
    return SecurityRoutingModule;
}());
exports.SecurityRoutingModule = SecurityRoutingModule;
