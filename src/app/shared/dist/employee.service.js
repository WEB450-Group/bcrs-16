"use strict";
/*
============================================
; Title: employee.service.ts
; Author: Professor Krasso
; Date: 02. July, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Employee service
;===========================================
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EmployeeService = void 0;
var core_1 = require("@angular/core");
var EmployeeService = /** @class */ (function () {
    function EmployeeService(http) {
        this.http = http;
    }
    // Find all employees
    EmployeeService.prototype.findAllEmployees = function () {
        return this.http.get('/api/employees');
    };
    // Find employee by employee ID
    EmployeeService.prototype.findEmployeeById = function (employeeId) {
        return this.http.get('/api/employees/' + employeeId);
    };
    // Create new employee
    EmployeeService.prototype.createNewEmployee = function (employee) {
        return this.http.post('/api/employees', employee);
    };
    // Update employee by employee ID
    EmployeeService.prototype.updateEmployeeById = function (employeeId, employee) {
        return this.http.put('/api/employees/' + employeeId, employee);
    };
    // Find Selected Security Questions
    EmployeeService.prototype.findSecurityQuestions = function (email) {
        return this.http.get("/api/employees/" + email + "/security-questions");
    };
    EmployeeService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], EmployeeService);
    return EmployeeService;
}());
exports.EmployeeService = EmployeeService;
