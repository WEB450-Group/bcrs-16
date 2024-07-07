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
import { EmployeeListComponent } from 'src/app/admin/employee-list/employee-list.component';
import { EditEmployeeComponent } from 'src/app/admin/edit-employee/edit-employee.component';
import { CreateEmployeeComponent } from 'src/app/admin/create-employee/create-employee.component';
import { ServiceGraphComponent } from 'src/app/service-graph/service-graph.component';
import { roleGuard } from 'src/app/shared/role.guard';

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
