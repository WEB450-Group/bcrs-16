"use strict";
/*
============================================
; Title:  order.ts
; Author: Professor Krasso
; Date: 20. July, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Order class
;===========================================
*/
exports.__esModule = true;
exports.Invoice = void 0;
var Invoice = /** @class */ (function () {
    function Invoice() {
        this.tax = 0.09;
        this.employeeId = 0;
        this.fullName = '';
        this.phoneNumber = '';
        this.customerEmail = '';
        this.lineItems = [];
        this.partsAmount = 0;
        this.laborAmount = 0;
        this.lineItemTotal = 0;
        this.invoiceTotal = 0;
    }
    // Calculate the total amount for line items
    Invoice.prototype.calculateLineItemsTotal = function () {
        var total = 0;
        for (var _i = 0, _a = this.lineItems; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.checked) {
                total += item.price;
            }
        }
        return total;
    };
    // Calculate the total amount for the invoice
    Invoice.prototype.calculateTotal = function () {
        this.lineItemTotal = this.calculateLineItemsTotal();
        var taxAmount = (this.laborAmount + this.lineItemTotal) * this.tax;
        this.invoiceTotal = this.laborAmount + this.lineItemTotal + taxAmount;
        return parseFloat(this.invoiceTotal.toFixed(2));
    };
    return Invoice;
}());
exports.Invoice = Invoice;
