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
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { ChartModule } from 'primeng/chart';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';


import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { ServiceGraphComponent } from './service-graph/service-graph.component';


@NgModule({
  declarations: [
    AdminComponent,
    EmployeeListComponent,
    EditEmployeeComponent,
    CreateEmployeeComponent,
    ServiceGraphComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    ChartModule
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
