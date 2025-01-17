"use strict";
/*
============================================
; Title:  app.module.ts
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: App Module
;===========================================
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var common_1 = require("@angular/common");
var http_1 = require("@angular/common/http");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var animations_1 = require("@angular/platform-browser/animations");
var icon_1 = require("@angular/material/icon");
var select_1 = require("@angular/material/select");
var form_field_1 = require("@angular/material/form-field");
var core_2 = require("@angular/material/core");
var ngx_cookie_service_1 = require("ngx-cookie-service");
var input_1 = require("@angular/material/input");
var stepper_1 = require("@angular/material/stepper");
var button_1 = require("@angular/material/button");
var dialog_1 = require("@angular/material/dialog");
var chart_1 = require("primeng/chart");
var table_1 = require("primeng/table");
var button_2 = require("primeng/button");
var inputtext_1 = require("primeng/inputtext");
var dropdown_1 = require("primeng/dropdown");
var multiselect_1 = require("primeng/multiselect");
var slider_1 = require("primeng/slider");
var progressbar_1 = require("primeng/progressbar");
var tag_1 = require("primeng/tag");
var app_component_1 = require("./app.component");
var home_component_1 = require("./home/home.component");
var contact_component_1 = require("./contact/contact.component");
var about_component_1 = require("./about/about.component");
var faq_component_1 = require("./faq/faq.component");
var not_found_component_1 = require("./not-found/not-found.component");
var service_repair_component_1 = require("./service-repair/service-repair.component");
var profile_component_1 = require("./profile/profile.component");
var app_routing_module_1 = require("./app-routing.module");
var shared_module_1 = require("./shared/shared.module");
var employee_directory_component_1 = require("./employee-directory/employee-directory.component");
var faq_dialog_component_1 = require("./faq/faq-dialog/faq-dialog.component");
var invoice_component_1 = require("./invoice/invoice.component");
var search_invoices_component_1 = require("./search-invoices/search-invoices.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                contact_component_1.ContactComponent,
                about_component_1.AboutComponent,
                faq_component_1.FaqComponent,
                not_found_component_1.NotFoundComponent,
                service_repair_component_1.ServiceRepairComponent,
                profile_component_1.ProfileComponent,
                employee_directory_component_1.EmployeeDirectoryComponent,
                faq_dialog_component_1.FaqDialogComponent,
                invoice_component_1.InvoiceComponent,
                search_invoices_component_1.SearchInvoicesComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                common_1.CommonModule,
                icon_1.MatIconModule,
                http_1.HttpClientModule,
                forms_1.ReactiveFormsModule,
                forms_1.FormsModule,
                router_1.RouterModule,
                select_1.MatSelectModule,
                form_field_1.MatFormFieldModule,
                core_2.MatOptionModule,
                app_routing_module_1.AppRoutingModule,
                shared_module_1.SharedModule,
                input_1.MatInputModule,
                stepper_1.MatStepperModule,
                button_1.MatButtonModule,
                dialog_1.MatDialogModule,
                chart_1.ChartModule,
                table_1.TableModule,
                button_2.ButtonModule,
                inputtext_1.InputTextModule,
                dropdown_1.DropdownModule,
                multiselect_1.MultiSelectModule,
                slider_1.SliderModule,
                progressbar_1.ProgressBarModule,
                tag_1.TagModule,
            ],
            providers: [ngx_cookie_service_1.CookieService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
