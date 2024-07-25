"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.InvoiceComponent = void 0;
/*
============================================
; Title:  invoice.component.ts
; Author: Professor Krasso
; Date: 24. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Invoice Component
;===========================================
*/
var core_1 = require("@angular/core");
var InvoiceComponent = /** @class */ (function () {
    function InvoiceComponent(route) {
        this.route = route;
        // instantiate new Invoice object
        this.invoice = {};
    }
    InvoiceComponent.prototype.ngOnInit = function () {
        // if the invoice query parameter is not null, parse it into an Order object
        var invoiceQueryParam = this.route.snapshot.queryParamMap.get('invoice');
        if (invoiceQueryParam !== null) {
            this.invoice = JSON.parse(invoiceQueryParam);
        }
    };
    //printer function for invoices 
    InvoiceComponent.prototype.printInvoice = function () {
        var printArea = document.getElementById('printArea');
        if (printArea) {
            var printWindow = window.open('', '_blank', 'width=800,height=600');
            if (printWindow) {
                printWindow.document.open();
                printWindow.document.write("\n          <html>\n            <head>\n              <title>Print Invoice</title>\n              <style>\n                @media print {\n                  body {\n                    font-family: Arial, sans-serif;\n                    padding: 20px;\n                  }\n                  .print-area {\n                    padding: 2rem;\n                  }\n                  .print-area img {\n                    margin: 0 auto 1rem auto; \n                    max-width: 100%; \n                    width: 260px; \n                    height: auto; \n                  }\n                  .print-area h2 {\n                    margin-top: 2rem;\n                    color: rgb(34, 77, 49);\n                    font-size: 2.25rem;\n                    font-weight: 300;\n                    font-family: \"Inter var\", sans-serif;\n                  }\n                  .print-area div.flex {\n                    display: flex;\n                    justify-content: space-between;\n                    align-items: center;\n                    margin-bottom: 10px;\n                  }\n                  .print-area label {\n                    font-weight: bold;\n                    text-align: left;\n                    flex-basis: 30%;\n                  }\n                  .print-area p,\n                  .print-area ul {\n                    text-align: right;\n                    flex-basis: 70%;\n                    margin: 0;\n                  }\n                  .print-area ul {\n                    list-style-type: none;\n                  }\n                }\n              </style>\n            </head>\n            <body>\n              <div class=\"print-area\">\n                " + printArea.innerHTML + "\n              </div>\n            </body>\n          </html>\n        ");
                printWindow.document.close();
                printWindow.print();
                printWindow.close();
            }
        }
    };
    InvoiceComponent = __decorate([
        core_1.Component({
            selector: 'app-invoice',
            templateUrl: './invoice.component.html',
            styleUrls: ['./invoice.component.scss']
        })
    ], InvoiceComponent);
    return InvoiceComponent;
}());
exports.InvoiceComponent = InvoiceComponent;
