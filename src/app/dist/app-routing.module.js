"use strict";
/*
============================================
; Title:  app.routes.ts
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: App Routes
;===========================================
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = exports.routes = void 0;
// imports statements
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var base_layout_component_1 = require("./shared/layouts/base-layout/base-layout.component");
var home_component_1 = require("./home/home.component");
var contact_component_1 = require("./contact/contact.component");
var not_found_component_1 = require("./not-found/not-found.component");
var about_component_1 = require("./about/about.component");
var service_repair_component_1 = require("./service-repair/service-repair.component");
var faq_component_1 = require("./faq/faq.component");
var profile_component_1 = require("./profile/profile.component");
// routes array with a path, component, and title for each route in the application (e.g. home, about, contact, etc.)
exports.routes = [
    {
        path: '',
        component: base_layout_component_1.BaseLayoutComponent,
        children: [
            {
                path: '',
                component: home_component_1.HomeComponent,
                title: "Bob's Computer repair shop: Home"
            },
            {
                path: 'home',
                component: home_component_1.HomeComponent,
                title: "Bob's Computer repair shop: Home"
            },
            {
                path: 'contact',
                component: contact_component_1.ContactComponent
            },
            {
                path: 'about',
                component: about_component_1.AboutComponent
            },
            {
                path: 'service-repair',
                component: service_repair_component_1.ServiceRepairComponent
            },
            {
                path: 'faq',
                component: faq_component_1.FaqComponent
            },
            {
                path: 'profile',
                component: profile_component_1.ProfileComponent
            },
        ]
    },
    {
        // path for the admin module (e.g. employee-list , create-user, service-graph, etc.)
        path: 'admin',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./admin/admin.module'); }).then(function (m) { return m.AdminModule; }); }
    },
    {
        // path for the security module (e.g. login, register, forgot password, etc.)
        path: 'security',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./security/security.module'); }).then(function (m) { return m.SecurityModule; }); }
    },
    {
        path: 'not-found',
        component: not_found_component_1.NotFoundComponent
    },
    {
        path: '**',
        redirectTo: 'not-found'
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            // imports the RouterModule and defines the routes array and other options (e.g. useHash, enableTracing, scrollPositionRestoration)
            imports: [router_1.RouterModule.forRoot(exports.routes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled' })],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
