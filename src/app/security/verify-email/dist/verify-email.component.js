"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VerifyEmailComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var VerifyEmailComponent = /** @class */ (function () {
    function VerifyEmailComponent(fb, securityService, router) {
        this.fb = fb;
        this.securityService = securityService;
        this.router = router;
        this.errMessage = '';
        this.isLoading = false;
        this.emailForm = this.fb.group({
            email: [null, [forms_1.Validators.required, forms_1.Validators.email]]
        });
        this.errMessage = '';
        this.isLoading = false;
    }
    VerifyEmailComponent.prototype.submit = function () {
        var _this = this;
        this.isLoading = true;
        var email = this.emailForm.controls['email'].value;
        console.log(email);
        console.log('Email from form:', email);
        this.securityService.verifyEmail(email).subscribe({
            next: function (res) {
                console.log(res);
                _this.router.navigate(['/security/verify-questions'], { queryParams: { email: email }, skipLocationChange: true });
            },
            error: function (err) {
                console.log('Server error from API call', err);
                if (err.status === 404) {
                    _this.errMessage = "The email address you provided was not found in our system";
                    _this.isLoading = false;
                    return;
                }
                _this.errMessage = "There was a problem verifying your email address, please try again or contact the system administrator";
                _this.isLoading = false;
            },
            complete: function () {
                _this.isLoading = false;
            }
        });
    };
    VerifyEmailComponent = __decorate([
        core_1.Component({
            selector: 'app-verify-email',
            templateUrl: './verify-email.component.html',
            styleUrls: ['./verify-email.component.scss']
        })
    ], VerifyEmailComponent);
    return VerifyEmailComponent;
}());
exports.VerifyEmailComponent = VerifyEmailComponent;
