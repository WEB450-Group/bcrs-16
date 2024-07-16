"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PasswordResetComponent = void 0;
/*
============================================
; Title:  password-reset.component.ts
; Author: Professor Krasso
; Date: 7. July, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Reset password Component
;===========================================
*/
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var PasswordResetComponent = /** @class */ (function () {
    function PasswordResetComponent(route, router, fb, securityService) {
        var _a;
        this.route = route;
        this.router = router;
        this.fb = fb;
        this.securityService = securityService;
        this.isLoading = false;
        this.fieldTextType = false;
        // Initialize the resetPasswordForm
        this.resetPasswordForm = this.fb.group({
            password: [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)])]
        });
        // Assign local variables
        this.email = (_a = this.route.snapshot.queryParamMap.get('email')) !== null && _a !== void 0 ? _a : '';
        this.errorMessage = '';
        // If the email is not found; the navigate them back to the sign in page
        if (!this.email) {
            console.error('No email found');
            this.router.navigate(['/security/signin']);
        }
    }
    PasswordResetComponent.prototype.resetPassword = function () {
        var _this = this;
        this.isLoading = true;
        // Get the password from the form
        var password = this.resetPasswordForm.controls['password'].value;
        // Call the security service to get the reset password API call and pass in the email and new password
        this.securityService.resetPassword(this.email, password).subscribe({
            next: function (result) {
                console.log(result);
                _this.router.navigate(['/security/signin']);
            },
            error: function (err) {
                console.error('Error changing password: ', err.error.message);
                _this.errorMessage = err;
                _this.isLoading = false;
            },
            complete: function () {
                alert("Password reset successful!");
            }
        });
    };
    PasswordResetComponent.prototype.toggleFieldTextType = function () {
        this.fieldTextType = !this.fieldTextType;
    };
    PasswordResetComponent = __decorate([
        core_1.Component({
            selector: 'app-password-reset',
            templateUrl: './password-reset.component.html',
            styleUrls: ['./password-reset.component.scss']
        })
    ], PasswordResetComponent);
    return PasswordResetComponent;
}());
exports.PasswordResetComponent = PasswordResetComponent;
