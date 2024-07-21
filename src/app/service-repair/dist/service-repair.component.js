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
var forms_1 = require("@angular/forms");
var ServiceRepairComponent = /** @class */ (function () {
    function ServiceRepairComponent(fb, router, invoiceService, cookieService, cdr) {
        this.fb = fb;
        this.router = router;
        this.invoiceService = invoiceService;
        this.cookieService = cookieService;
        this.cdr = cdr;
        //create form group
        this.serviceForm = this.fb.group({
            fullName: [null, forms_1.Validators.required],
            phoneNumber: [null, forms_1.Validators.required],
            customerEmail: [null, [forms_1.Validators.required, forms_1.Validators.email]],
            customOrder: [null],
            lineItems: this.fb.array([])
        }, { updateOn: 'blur' });
        //initialize variables
        this.errMessage = '';
        this.successMessage = '';
        this.isLoading = false;
        this.lineItems = [];
        this.customItem = 0;
        this.invoice = {};
        this.tax = 0.09;
        this.total = 0;
        this.checked = false;
        this.date = new Date().toLocaleDateString();
    }
    ServiceRepairComponent.prototype.ngOnInit = function () {
        // initialize the line items 
        this.lineItems = [
            { itemId: 1, itemName: 'Password Reset', price: 39.99, checked: false },
            { itemId: 2, itemName: 'Spyware Removal', price: 99.99, checked: false },
            { itemId: 3, itemName: 'RAM Upgrade', price: 129.99, checked: false },
            { itemId: 4, itemName: 'Software Installation', price: 49.99, checked: false },
            { itemId: 5, itemName: 'PC Tune-up', price: 89.99, checked: false },
            { itemId: 6, itemName: 'Keyboard Cleaning', price: 45.00, checked: false },
            { itemId: 7, itemName: 'Disk Clean-up', price: 129.99, checked: false }
        ];
    };
    //calculate the total invoice amount
    ServiceRepairComponent.prototype.calculateTotal = function () {
        var partsAmount = 0;
        var laborAmount = this.customItem * 50;
        var lineItemTotal = this.calculateLineItems(this.lineItems);
        var tax = (laborAmount + lineItemTotal) * this.tax;
        return partsAmount + laborAmount + lineItemTotal + tax;
    };
    // calculate the total price of checked line items
    ServiceRepairComponent.prototype.calculateLineItems = function (lineItems) {
        var total = 0;
        for (var i = 0; i < lineItems.length; i++) {
            if (lineItems[i].checked) {
                total += lineItems[i].price;
            }
        }
        return total;
    };
    //printer function for invoices 
    ServiceRepairComponent.prototype.printInvoice = function () {
        var printArea = document.getElementById('printArea');
        if (printArea) {
            var printWindow = window.open('', '_blank', 'width=800,height=600');
            printWindow === null || printWindow === void 0 ? void 0 : printWindow.document.open();
            printWindow === null || printWindow === void 0 ? void 0 : printWindow.document.write("\n        <html>\n          <head>\n            <title>Print Invoice</title>\n            <style>\n              @media print {\n                body {\n                  font-family: Arial, sans-serif;\n                  padding: 20px;\n                }\n                .print-area {\n                  padding: 2rem;\n                }\n                .print-area img {\n                  display: block;\n                  margin: 0 auto;\n                }\n                .print-area h2 {\n                  margin-top: 2rem;\n                  color: rgb(34, 77, 49);\n                  font-size: 2.25rem;\n                  font-weight: 300;\n                  font-family: \"Inter var\", sans-serif;\n                }\n                .print-area div.flex {\n                  display: flex;\n                  justify-content: space-between;\n                  align-items: center;\n                  margin-bottom: 10px;\n                }\n                .print-area label {\n                  font-weight: bold;\n                  text-align: left;\n                  flex-basis: 30%;\n                }\n                .print-area p,\n                .print-area ul {\n                  text-align: right;\n                  flex-basis: 70%;\n                  margin: 0;\n                }\n                .print-area ul {\n                  list-style-type: none;\n                }\n              }\n            </style>\n          </head>\n          <body>\n            <div class=\"print-area\">\n              " + printArea.innerHTML + "\n            </div>\n          </body>\n        </html>\n        ");
            printWindow === null || printWindow === void 0 ? void 0 : printWindow.document.close();
            printWindow === null || printWindow === void 0 ? void 0 : printWindow.print();
            printWindow === null || printWindow === void 0 ? void 0 : printWindow.close();
        }
    };
    //create invoice
    ServiceRepairComponent.prototype.createInvoice = function () {
        var _this = this;
        var _a, _b, _c, _d;
        this.isLoading = true;
        // Get session user employee ID for invoice 
        var sessionUserString = this.cookieService.get('session_user');
        var sessionUser = JSON.parse(sessionUserString);
        var employeeId = sessionUser.employeeId;
        //check if at least one item is checked or a custom item is provided
        var isAnyItemChecked = this.lineItems.some(function (item) { return item.checked; });
        var isCustomItemProvided = !!this.customItem;
        if (!isAnyItemChecked && !isCustomItemProvided) {
            //error message if not items or labor checked
            this.errMessage = 'Please select at least one service or provide a custom order.';
            this.isLoading = false;
            return;
        }
        // //If email and password fields empty display error message
        // if (!this.invoice.fullName || !this.invoice.customerEmail || !this.invoice.phoneNumber) {
        //   this.errMessage = 'Please provide customer\'s name, email address, and phone number';
        //   this.isLoading = false;
        //   return;
        // }
        // Create invoice 
        this.invoice = {
            employeeId: parseInt(employeeId, 10),
            fullName: (_a = this.serviceForm.get('fullName')) === null || _a === void 0 ? void 0 : _a.value,
            phoneNumber: (_b = this.serviceForm.get('phoneNumber')) === null || _b === void 0 ? void 0 : _b.value,
            customerEmail: (_c = this.serviceForm.get('customerEmail')) === null || _c === void 0 ? void 0 : _c.value,
            lineItems: this.lineItems.filter(function (item) { return item.checked; }),
            partsAmount: 0,
            laborAmount: this.customItem * 50,
            lineItemTotal: this.calculateLineItems(this.lineItems),
            invoiceTotal: parseFloat(this.calculateTotal().toFixed(2)),
            orderDate: this.date,
            customOrderDescription: (_d = this.serviceForm.get('customOrder')) === null || _d === void 0 ? void 0 : _d.value
        };
        // send the invoice to the server
        this.invoiceService.createInvoice(this.invoice).subscribe({
            next: function (response) {
                //store response for populating invoice
                _this.invoice = response;
                console.log('Result from register API call', response);
                //sucess message
                _this.successMessage = "Invoice Sucessfully Created";
                //scroll to top of page where sucess message is displayed 
                window.scrollTo(0, 0);
                _this.isLoading = false;
            },
            error: function (err) {
                if (err.error && err.error.message) {
                    console.log('Database Error', err.error.message);
                    _this.errMessage = err.error.message;
                }
                else {
                    _this.errMessage = "Something went wrong, please contact the system administrator";
                    console.log(_this.errMessage);
                }
                _this.isLoading = false;
                return;
            }
        });
        this.clearForm();
    };
    //clear form for next invoice creation 
    ServiceRepairComponent.prototype.clearForm = function () {
        // Reset form controls
        this.serviceForm.reset({
            fullName: null,
            phoneNumber: null,
            customerEmail: null,
            customOrder: null
        });
        this.lineItems.forEach(function (item) { return item.checked = false; });
        this.customItem = 0;
        this.errMessage = '';
        this.total = 0;
        this.isLoading = false;
    };
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
