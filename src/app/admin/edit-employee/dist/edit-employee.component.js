"use strict";
/*
============================================
; Title: edit-employee.component.ts
; Author: Professor Krasso
; Date: 03. July, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Employee Edit Component
;===========================================
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditEmployeeComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var EditEmployeeComponent = /** @class */ (function () {
    function EditEmployeeComponent(route, router, fb, employeeService) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.fb = fb;
        this.employeeService = employeeService;
        this.isLoading = false;
        // Initialize the form
        this.editEmployeeForm = this.fb.group({
            role: [null, forms_1.Validators.compose([forms_1.Validators.required])],
            isDisabled: [null, forms_1.Validators.compose([forms_1.Validators.required])]
        });
        // Assign local variables
        var l_employeeID = this.route.snapshot.paramMap.get('employeeId') || ''; // Get the employeeId from the route
        this.employeeId = parseInt(l_employeeID, 10);
        this.employee = {};
        this.errorMessage = '';
        // If the employeeId is not a number; then just navigate the user back to the employee list
        if (isNaN(this.employeeId)) {
            this.router.navigate(['/employee-list']);
        }
        // Get the employee information by calling the findEmployeeByID function and subscribing to it
        this.employeeService.findEmployeeById(this.employeeId).subscribe({
            next: function (employee) {
                console.log(employee);
                // Set the employee found by the ID
                _this.employee = employee;
                // Set the default values of the edit employee form
                _this.editEmployeeForm.patchValue({
                    role: _this.employee.role,
                    isDisabled: _this.employee.isDisabled ? 'true' : 'false'
                });
            },
            error: function (err) {
                console.error(err);
                // Write the error message
                _this.errorMessage = "Cannot find employee with ID " + _this.employeeId;
            }
        });
    }
    EditEmployeeComponent.prototype.editEmployee = function () {
        var _this = this;
        this.isLoading = true;
        // Create an employee edit object
        var editEmployee = {};
        // Set the edit employee values to the ones on the form
        editEmployee.role = this.editEmployeeForm.controls['role'].value;
        editEmployee.isDisabled = this.stringToBoolean(this.editEmployeeForm.controls['isDisabled'].value);
        console.log('isDisable after change: ', editEmployee.isDisabled);
        // Call the updateEmployee API and pass in the employeeID and the new information from the employee
        this.employeeService.updateEmployeeById(this.employeeId, editEmployee).subscribe({
            next: function (result) {
                console.log(result);
                // If the result is successful then navigate the user back to the employee list
                _this.router.navigate(['/admin/employees']);
            },
            error: function (err) {
                console.log(err);
                // Write the error message
                _this.errorMessage = 'Failed to update employee information.';
                _this.isLoading = false;
            }
        });
    };
    EditEmployeeComponent.prototype.stringToBoolean = function (str) {
        return str.toLowerCase() === 'true';
    };
    EditEmployeeComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-employee',
            templateUrl: './edit-employee.component.html',
            styleUrls: ['./edit-employee.component.scss']
        })
    ], EditEmployeeComponent);
    return EditEmployeeComponent;
}());
exports.EditEmployeeComponent = EditEmployeeComponent;
