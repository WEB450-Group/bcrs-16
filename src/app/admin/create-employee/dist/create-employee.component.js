"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateEmployeeComponent = void 0;
/*
============================================
; Title: create-employee.component.ts
; Author: Professor Krasso
; Date: 03. July, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Create Employee Component
;===========================================
*/
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var CreateEmployeeComponent = /** @class */ (function () {
    function CreateEmployeeComponent(fb, router, employeeService) {
        this.fb = fb;
        this.router = router;
        this.employeeService = employeeService;
        // Creating and assigning employee form
        this.employeeForm = this.fb.group({
            firstName: [null, forms_1.Validators.compose([forms_1.Validators.required])],
            lastName: [null, forms_1.Validators.compose([forms_1.Validators.required])],
            email: [null, forms_1.Validators.compose([forms_1.Validators.required])],
            phoneNumber: [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern('^\\(\\d{3}\\)\\d{3}-\\d{4}$')])],
            address: [null, forms_1.Validators.compose([forms_1.Validators.required])],
            role: [null, forms_1.Validators.compose([forms_1.Validators.required])]
        });
        // Assigning local variables
        this.errorMessage = '';
        this.showAnswerField = false;
        this.isLoading = false;
    }
    // Function to create employee
    CreateEmployeeComponent.prototype.createEmployee = function () {
        var _this = this;
        this.isLoading = true;
        // Creating the new employee with the form values
        var employee = {
            firstName: this.employeeForm.controls['firstName'].value,
            lastName: this.employeeForm.controls['lastName'].value,
            email: this.employeeForm.controls['email'].value.toLowerCase(),
            phoneNumber: this.employeeForm.controls['phoneNumber'].value,
            address: this.employeeForm.controls['address'].value,
            role: this.employeeForm.controls['role'].value
        };
        // Calling the createNewEmployee API passing in the employee created
        this.employeeService.createNewEmployee(employee).subscribe({
            next: function (result) {
                console.log(result);
            },
            error: function (err) {
                console.log(err);
                _this.errorMessage = 'Error occurred while creating the employee!';
                _this.isLoading = false;
            },
            complete: function () {
                alert('User created successfully!');
                _this.router.navigate(['/admin/employees']);
            }
        });
    };
    CreateEmployeeComponent = __decorate([
        core_1.Component({
            selector: 'app-create-employee',
            templateUrl: './create-employee.component.html',
            styleUrls: ['./create-employee.component.scss']
        })
    ], CreateEmployeeComponent);
    return CreateEmployeeComponent;
}());
exports.CreateEmployeeComponent = CreateEmployeeComponent;
