"use strict";
/*
============================================
; Title:  search-invoice.component.ts
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Search Invoice Component
;===========================================
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SearchInvoicesComponent = void 0;
var core_1 = require("@angular/core");
var SearchInvoicesComponent = /** @class */ (function () {
    function SearchInvoicesComponent(invoiceService) {
        this.invoiceService = invoiceService;
        this.invoices = [];
        this.loading = true;
    }
    SearchInvoicesComponent.prototype.ngOnInit = function () {
        this.loadInvoices();
    };
    SearchInvoicesComponent.prototype.loadInvoices = function () {
        var _this = this;
        this.invoiceService.getInvoices().subscribe({
            next: function (data) {
                _this.invoices = data;
                _this.loading = false;
            },
            error: function (err) {
                console.error('Error loading invoices:', err);
                _this.loading = false;
            }
        });
    };
    SearchInvoicesComponent.prototype.clear = function (dt) {
        dt.clear();
    };
    SearchInvoicesComponent.prototype.getSeverity = function (status) {
        switch (status) {
            case 'Completed':
                return 'success';
            case 'Pending':
                return 'warning';
            case 'Cancelled':
                return 'danger';
            default:
                return 'info';
        }
    };
    SearchInvoicesComponent = __decorate([
        core_1.Component({
            selector: 'app-search-invoices',
            templateUrl: './search-invoices.component.html',
            styleUrls: ['./search-invoices.component.scss']
        })
    ], SearchInvoicesComponent);
    return SearchInvoicesComponent;
}());
exports.SearchInvoicesComponent = SearchInvoicesComponent;
