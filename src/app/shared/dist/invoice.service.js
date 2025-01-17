"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.InvoiceService = void 0;
/*
============================================
; Title: invoice.service.ts
; Author: Professor Krasso
; Date: 02. July, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Invoice service
;===========================================
*/
var core_1 = require("@angular/core");
var InvoiceService = /** @class */ (function () {
    function InvoiceService(http) {
        this.http = http;
    }
    InvoiceService.prototype.createInvoice = function (invoice) {
        return this.http.post('/api/invoices/' + invoice.employeeId, invoice);
    };
    InvoiceService.prototype.findAllServiceRequests = function () {
        return this.http.get('/api/invoices/service-graph');
    };
    InvoiceService.prototype.getInvoices = function () {
        return this.http.get('/api/invoices/invoice-list');
    };
    InvoiceService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], InvoiceService);
    return InvoiceService;
}());
exports.InvoiceService = InvoiceService;
