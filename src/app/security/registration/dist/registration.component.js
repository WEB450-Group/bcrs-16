"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegistrationComponent = void 0;
/*
============================================
; Title:  registration.component.ts
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Registration Component
;===========================================
*/
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var RegistrationComponent = /** @class */ (function () {
    function RegistrationComponent(_formBuilder, router, securityService) {
        this._formBuilder = _formBuilder;
        this.router = router;
        this.securityService = securityService;
        //stepper valiables
        this.isLinear = false;
        //variable for hide/show password
        this.fieldTextType = false;
        //Stepper form group assignments and validators 
        this.firstFormGroup = this._formBuilder.group({
            email: [null, [forms_1.Validators.required, forms_1.Validators.email]],
            password: [null, forms_1.Validators.required, forms_1.Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]
        });
        this.secondFormGroup = this._formBuilder.group({
            firstName: [null, forms_1.Validators.required],
            lastName: [null, forms_1.Validators.required],
            phoneNumber: [null, forms_1.Validators.required],
            address: [null, forms_1.Validators.required]
        });
        this.thirdFormGroup = this._formBuilder.group({
            question1: [null, forms_1.Validators.required],
            answer1: [null, forms_1.Validators.required],
            question2: [null, forms_1.Validators.required],
            answer2: [null, forms_1.Validators.required],
            question3: [null, forms_1.Validators.required],
            answer3: [null, forms_1.Validators.required]
        });
        this.errMessage = '';
        this.isLoading = false;
        //Save to database and query with an API? 
        //Security questions array
        this.securityQuestions = [
            "What City was your mom born in?",
            "What is the name of your best friend growing up?",
            "What was your favorite childhood teacher's name?",
            "What Street did you grow up on?"
        ];
        //Initializes first questions array to the securityQuestions array
        this.qArray1 = this.securityQuestions;
        //Initializes second questions array to an empty array
        this.qArray2 = [];
        //Initializes third questions array to an empty array
        this.qArray3 = [];
        //Initialize employee object to Employee Interface 
        this.employee = {};
    }
    //Cascading for dropdown menus
    RegistrationComponent.prototype.ngOnInit = function () {
        var _this = this;
        var _a, _b;
        //subscribe to the value changes oof the security question 1
        (_a = this.thirdFormGroup.get('question1')) === null || _a === void 0 ? void 0 : _a.valueChanges.subscribe(function (val) {
            console.log('Value changed from question 1', val);
            //filter the second array of questions to remove the selected question 
            _this.qArray2 = _this.qArray1.filter(function (q) { return q !== val; });
        });
        //subscribe to the value changes oof the security question 2
        (_b = this.thirdFormGroup.get('question2')) === null || _b === void 0 ? void 0 : _b.valueChanges.subscribe(function (val) {
            console.log('Value changed from question 2', val);
            //filter the third array of questions to remove the selected question 
            _this.qArray3 = _this.qArray2.filter(function (q) { return q !== val; });
        });
    };
    //Registers new user and redirects them to login page
    RegistrationComponent.prototype.register = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        //if form is invalid call markAsTouched and errors where they occured
        if (this.firstFormGroup.invalid || this.secondFormGroup.invalid || this.thirdFormGroup.invalid) {
            this.markAllAsTouched();
            this.errMessage = 'Please complete required fields';
            return;
        }
        this.errMessage = '';
        this.isLoading = true;
        this.employee = {
            email: (_a = this.firstFormGroup.get('email')) === null || _a === void 0 ? void 0 : _a.value,
            password: (_b = this.firstFormGroup.get('password')) === null || _b === void 0 ? void 0 : _b.value,
            firstName: (_c = this.secondFormGroup.get('firstName')) === null || _c === void 0 ? void 0 : _c.value,
            lastName: (_d = this.secondFormGroup.get('lastName')) === null || _d === void 0 ? void 0 : _d.value,
            phoneNumber: (_e = this.secondFormGroup.get('phoneNumber')) === null || _e === void 0 ? void 0 : _e.value,
            address: (_f = this.secondFormGroup.get('address')) === null || _f === void 0 ? void 0 : _f.value,
            selectedSecurityQuestions: [
                {
                    question: (_g = this.thirdFormGroup.get('question1')) === null || _g === void 0 ? void 0 : _g.value,
                    answer: (_h = this.thirdFormGroup.get('answer1')) === null || _h === void 0 ? void 0 : _h.value
                },
                {
                    question: (_j = this.thirdFormGroup.get('question2')) === null || _j === void 0 ? void 0 : _j.value,
                    answer: (_k = this.thirdFormGroup.get('answer2')) === null || _k === void 0 ? void 0 : _k.value
                },
                {
                    question: (_l = this.thirdFormGroup.get('question3')) === null || _l === void 0 ? void 0 : _l.value,
                    answer: (_m = this.thirdFormGroup.get('answer3')) === null || _m === void 0 ? void 0 : _m.value
                }
            ],
            role: 'standard',
            isDisabled: false
        };
        //This is the last log
        console.log("Registering new user", this.employee);
        //subscribe to register API call result
        this.securityService.register(this.employee).subscribe({
            next: function (result) {
                console.log('Result from register API call', result);
                //after succesful registration, redirect the user to the signin page
                _this.router.navigate(['/security/signin']);
            },
            //Error handling for database issues
            error: function (err) {
                if (err.error && err.error.message) {
                    console.log('Database Error', err.error.message);
                    _this.errMessage = err.error.message;
                }
                else {
                    _this.errMessage = "Something went wrong, please contact the system administrator";
                    console.log(_this.errMessage);
                }
            }
        });
    };
    //Marks the control and all its descendant controls as touched 
    //on submit if fields left empty global error occures and error messages for empty fields pop up
    RegistrationComponent.prototype.markAllAsTouched = function () {
        this.firstFormGroup.markAllAsTouched();
        this.secondFormGroup.markAllAsTouched();
        this.thirdFormGroup.markAllAsTouched();
    };
    //Toggle show/hide password
    RegistrationComponent.prototype.toggleFieldTextType = function () {
        this.fieldTextType = !this.fieldTextType;
    };
    RegistrationComponent = __decorate([
        core_1.Component({
            selector: 'app-registration',
            templateUrl: './registration.component.html',
            styleUrls: ['./registration.component.scss']
        })
    ], RegistrationComponent);
    return RegistrationComponent;
}());
exports.RegistrationComponent = RegistrationComponent;
