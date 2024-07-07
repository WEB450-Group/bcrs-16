/*
============================================
; Title:  admin.module.ts
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Admin Module
;===========================================
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';


import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { ServiceGraphComponent } from './service-graph/service-graph.component';
import { NavComponent } from '../shared/layouts/nav/nav.component';
import { FooterComponent } from '../shared/layouts/footer/footer.component';


@NgModule({
  declarations: [
    AdminComponent,
    EmployeeListComponent,
    EditEmployeeComponent,
    CreateEmployeeComponent,
    ServiceGraphComponent,
    // NavComponent,
    // FooterComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedModule
  ],
  exports: [
    AdminComponent,
    EmployeeListComponent,
    EditEmployeeComponent,
    CreateEmployeeComponent,
    ServiceGraphComponent
  ]
})
export class AdminModule { }
