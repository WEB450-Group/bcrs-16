"use strict";
/*
============================================
; Title:  security.module.ts
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Security Module
;===========================================
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SecurityModule = void 0;
// import statements
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var input_1 = require("@angular/material/input");
var stepper_1 = require("@angular/material/stepper");
var button_1 = require("@angular/material/button");
var icon_1 = require("@angular/material/icon");
var select_1 = require("@angular/material/select");
var form_field_1 = require("@angular/material/form-field");
var core_2 = require("@angular/material/core");
var security_routing_module_1 = require("./security-routing.module");
var security_component_1 = require("./security.component");
var signin_component_1 = require("./signin/signin.component");
var registration_component_1 = require("./registration/registration.component");
var password_reset_component_1 = require("./password-reset/password-reset.component");
var SecurityModule = /** @class */ (function () {
    function SecurityModule() {
    }
    SecurityModule = __decorate([
        core_1.NgModule({
            declarations: [
                security_component_1.SecurityComponent,
                signin_component_1.SigninComponent,
                registration_component_1.RegistrationComponent,
                password_reset_component_1.PasswordResetComponent
            ],
            imports: [
                common_1.CommonModule,
                security_routing_module_1.SecurityRoutingModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpClientModule,
                router_1.RouterModule,
                input_1.MatInputModule,
                stepper_1.MatStepperModule,
                button_1.MatButtonModule,
                select_1.MatSelectModule,
                icon_1.MatIconModule,
                form_field_1.MatFormFieldModule,
                core_2.MatOptionModule
            ]
        })
    ], SecurityModule);
    return SecurityModule;
}());
exports.SecurityModule = SecurityModule;
