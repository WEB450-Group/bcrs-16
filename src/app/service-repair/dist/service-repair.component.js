"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ServiceRepairComponent = void 0;
/*
============================================
; Title:  service-repair.component.ts
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Service Repair Component
;===========================================
*/
var core_1 = require("@angular/core");
var ServiceRepairComponent = /** @class */ (function () {
    function ServiceRepairComponent() {
    }
    ServiceRepairComponent = __decorate([
        core_1.Component({
            selector: 'app-service-repair',
            templateUrl: './service-repair.component.html',
            styleUrls: ['./service-repair.component.scss']
        })
    ], ServiceRepairComponent);
    return ServiceRepairComponent;
}());
exports.ServiceRepairComponent = ServiceRepairComponent;
