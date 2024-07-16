"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SigninComponent = void 0;
/*
============================================
; Title:  sign-in.component.ts
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Sign-in Component
;===========================================
*/
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var SigninComponent = /** @class */ (function () {
    function SigninComponent(fb, router, cookieService, secService, route) {
        this.fb = fb;
        this.router = router;
        this.cookieService = cookieService;
        this.secService = secService;
        this.route = route;
        this.errMessage = '';
        this.isLoading = false;
        this.fieldTextType = false;
        this.signinForm = this.fb.group({
            email: [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.email])],
            password: [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)])]
        }, { updateOn: 'submit' });
        this.errMessage = '';
    }
    SigninComponent.prototype.signIn = function () {
        var _this = this;
        // Spinner
        this.isLoading = true;
        // console.log('Signin Form', this.signinForm.value);
        //get email value from signin form
        var email = this.signinForm.controls['email'].value;
        //get password from form
        var password = this.signinForm.controls['password'].value;
        //If email and password fields empty display error message
        if (!email) {
            this.errMessage = 'Please provide your email address';
            this.isLoading = false;
            return;
        }
        if (!password) {
            this.errMessage = 'Please provide your password';
            this.isLoading = false;
            return;
        }
        //call signin function from security service
        this.secService.signIn(email, password).subscribe({
            //if succesfful set session_user cookie and redirect user to logged in homepage
            next: function (employee) {
                console.log('employee', employee);
                //create the sessionCookie object
                var sessionCookie = {
                    employeeId: employee.employeeId,
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    email: employee.email,
                    phoneNumber: employee.phoneNumber,
                    address: employee.address,
                    isDisabled: employee.isDisabled,
                    role: employee.role,
                    selectedSecurityQuestions: employee.selectedSecurityQuestions
                };
                //set session user
                _this.cookieService.set('session_user', JSON.stringify(sessionCookie), 1);
                //check if there is a return URL, if not redirect to home page
                var returnUrl = _this.route.snapshot.queryParamMap.get('returnUrl') || '/';
                //set is loading to false when logged in
                _this.isLoading = false;
                //redirect user to the returnURL
                _this.router.navigate([returnUrl]);
            },
            error: function (err) {
                console.log('Server error from API call', err);
                if (err.status === 400 || 401) {
                    _this.errMessage = "The email address and/or password you provided are not valid";
                    _this.isLoading = false;
                    return;
                }
                _this.errMessage = "There was a problem verifying your email address, please try again or contact the system administrator";
                _this.isLoading = false;
            }
        });
    };
    SigninComponent.prototype.toggleFieldTextType = function () {
        this.fieldTextType = !this.fieldTextType;
    };
    SigninComponent = __decorate([
        core_1.Component({
            selector: 'app-signin',
            templateUrl: './signin.component.html',
            styleUrls: ['./signin.component.scss']
        })
    ], SigninComponent);
    return SigninComponent;
}());
exports.SigninComponent = SigninComponent;
