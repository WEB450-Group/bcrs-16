/*
============================================
; Title:  admin-routing.module.ts
; Author: Professor Krasso
; Date: 6. July, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Admin Routing Module
;===========================================
*/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { ServiceGraphComponent } from './service-graph/service-graph.component';
import { roleGuard } from '../shared/role.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'employees',
        component: EmployeeListComponent
      },
      {
        path: 'edit-employee',
        component: EditEmployeeComponent
      },
      {
        path: 'create-employee',
        component: CreateEmployeeComponent
      },
      {
        path: 'service-graph',
        component: ServiceGraphComponent
      }
    ],
    canActivate: [roleGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
