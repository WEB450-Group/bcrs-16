"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FaqComponent = void 0;
/*
============================================
; Title:  faq.component.ts
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: FAQ Component
;===========================================
*/
var core_1 = require("@angular/core");
var faq_dialog_component_1 = require("./faq-dialog/faq-dialog.component");
var FaqComponent = /** @class */ (function () {
    function FaqComponent(dialog) {
        this.dialog = dialog;
        // Initialize the FAQs array
        this.faqs = [
            {
                question: 'How to reset your password?',
                answer: "To reset your password, follow this steps:\n        1. Navigate to the login page by clicking 'Log in' in the top right of the home page.\n        2. Click on 'Forgot Password'.\n        3. Enter your registered email address.\n        4. Answer the security questions.\n        5. Enter your new password."
            },
            {
                question: 'How to register an account?',
                answer: "To register an account, follow this steps:\n        1. Navigate to the registration page by clicking 'Register' in the top right of the home page.\n        2. Follow the steps to create an account."
            },
            {
                question: 'How to know who are your coworkers?',
                answer: "To know who your coworkers are, follow this steps:\n        1. Navigate to the login page by clicking 'Log in' in the top right of the home page.\n        2. Login with your email and password.\n        3. Once logged in, on the top right of the page you will see your name. Click on it.\n        4. Click on 'Employee Directory'."
            },
            {
                question: 'How create service request?',
                answer: "To learn how to create a service request, follow these steps:\n        1. Navigate to 'Service Repair' in the Navigation bar or, when logged in, click the 'Create New Service' button on the home screen.\n        2. Fill out the 'Service Request' form on the left side of the page (NOTE: Full Name, Phone Number, Email, and at least one service must be marked or the form will not submit).\n        3. Click on the 'Create Service' button at the bottom of the Service Request form; all data should populate in the 'Invoice' section on the right."
            },
            {
                question: 'How print an invoice?',
                answer: "To learn how to print an invoice, follow these steps:\n        1. After creating a service request, the data should populate on the right-hand side in the 'Invoice' section.\n        2. Go over the information carefully with the client and make sure fields are correct.\n        3. If all fields are correct, click on the 'Print' button at the bottom of the form.\n        4. Print the document and give it to the client to bring back to retrieve their order upon completion."
            },
            {
                question: 'How to use Service Graph?',
                answer: "To learn how to use the service graph, follow these steps:\n        1. Once logged in, click on your name in the top right navigation to access the dropdown menu.\n        2. Click on the 'Service Graph' link.\n        3. Choose either 'Pie Chart' or 'Bar Chart' to view the data in each graphical representation."
            },
            {
                question: 'How to update User Profile?',
                answer: "To learn how to update your profile follow these streps:\n        1. Once logged in, click on your name in the top right navigation to access the dropdown menu.\n        2. Click on the 'Profile' link\n        3. Click on the 'Edit' button in the top right of the profile information.\n        4. Change desired fields and click the 'Update Profile' button."
            },
        ];
    }
    FaqComponent.prototype.openDialog = function (faq) {
        // Open the dialog with the FAQ data
        this.dialog.open(faq_dialog_component_1.FaqDialogComponent, {
            data: faq
        });
    };
    FaqComponent = __decorate([
        core_1.Component({
            selector: 'app-faq',
            templateUrl: './faq.component.html',
            styleUrls: ['./faq.component.scss']
        })
    ], FaqComponent);
    return FaqComponent;
}());
exports.FaqComponent = FaqComponent;
