"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VerifyQuestionsComponent = void 0;
/*
============================================
; Title:  verify-questions.component.ts
; Author: Professor Krasso
; Date: 11. July, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Verify Security Questions Component
;===========================================
*/
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var VerifyQuestionsComponent = /** @class */ (function () {
    function VerifyQuestionsComponent(route, fb, securityService, employeeService, router) {
        var _this = this;
        var _a;
        this.route = route;
        this.fb = fb;
        this.securityService = securityService;
        this.employeeService = employeeService;
        this.router = router;
        this.errMessage = '';
        this.isLoadingQuestions = true;
        this.isLoadingSubmit = false;
        // Array that holds selected security questions
        this.selectedSecurityQuestions = [];
        //Form group for security question input answers
        this.sqForm = this.fb.group({
            answer1: [null, forms_1.Validators.compose([forms_1.Validators.required])],
            answer2: [null, forms_1.Validators.compose([forms_1.Validators.required])],
            answer3: [null, forms_1.Validators.compose([forms_1.Validators.required])]
        });
        //initialize variables
        this.errMessage = '';
        this.selectedSecurityQuestions = [];
        this.question1 = '';
        this.question2 = '';
        this.question3 = '';
        //get email from query string
        this.email = (_a = this.route.snapshot.queryParamMap.get('email')) !== null && _a !== void 0 ? _a : '';
        console.log("Email: ", this.email);
        //if no email address is found redirect back to the verify-email page
        if (!this.email) {
            this.router.navigate(['/security/verify-email']);
            return;
        }
        //subscribe to findSelectedSecurityQuestions API and retrieve users security questions
        this.employeeService.findSecurityQuestions(this.email).subscribe({
            next: function (data) {
                //assign the data to the selectedSecurityQuestions array
                _this.selectedSecurityQuestions = data;
                console.log("Users retrieved questions", _this.selectedSecurityQuestions);
            },
            error: function (err) {
                console.log("Server error from findSecurityQuestions call");
                //if error status 404, email not found
                if (err.status === 404) {
                    _this.errMessage = "Email does not match any in our records";
                    return;
                    //if not 404, send server error
                }
                else {
                    _this.errMessage = "There was a problem verifying your security questions, please try again";
                }
                _this.isLoadingQuestions = false;
            },
            //assign questions to question variables
            complete: function () {
                _this.question1 = _this.selectedSecurityQuestions[0].question;
                _this.question2 = _this.selectedSecurityQuestions[1].question;
                _this.question3 = _this.selectedSecurityQuestions[2].question;
                _this.isLoadingQuestions = false;
            }
        });
    }
    VerifyQuestionsComponent.prototype.submit = function () {
        var _this = this;
        //if form is invalid call markAsTouched and errors where they occured
        if (this.sqForm.invalid) {
            this.sqForm.markAllAsTouched();
            this.errMessage = 'Please complete required fields';
            return;
        }
        this.isLoadingSubmit = true;
        //log entered values
        console.log(this.sqForm.value);
        var email = this.email;
        //create array and assign input to it to compare
        var securityQuestions = [
            {
                question: this.question1,
                answer: this.sqForm.controls['answer1'].value
            },
            {
                question: this.question2,
                answer: this.sqForm.controls['answer2'].value
            },
            {
                question: this.question3,
                answer: this.sqForm.controls['answer3'].value
            },
        ];
        //log user input
        console.log('Provided security questions', securityQuestions);
        //subscribe to verifySecurityQuestions API to compare input answers with saved data
        this.securityService.verifySecurityQuestions(this.email, securityQuestions).subscribe({
            next: function (res) {
                console.log('Response from submit call', res);
                //if answers match navigate to re-wet password page
                _this.router.navigate(['/security/password-reset'], { queryParams: { email: email }, skipLocationChange: true });
            },
            error: function (err) {
                //if error, log error
                if (err.error.message) {
                    _this.errMessage = err.error.message;
                    console.log('Server error from submit call', err.error.message);
                    _this.isLoadingSubmit = false;
                    return;
                }
                else {
                    console.error('Server Error from submit call', err);
                    _this.errMessage = "There was a problem verifying your security question, Please try again";
                    _this.isLoadingSubmit = false;
                }
            },
            complete: function () {
                _this.isLoadingSubmit = false;
            }
        });
    };
    VerifyQuestionsComponent = __decorate([
        core_1.Component({
            selector: 'app-verify-questions',
            templateUrl: './verify-questions.component.html',
            styleUrls: ['./verify-questions.component.scss']
        })
    ], VerifyQuestionsComponent);
    return VerifyQuestionsComponent;
}());
exports.VerifyQuestionsComponent = VerifyQuestionsComponent;
