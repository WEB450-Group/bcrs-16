/*
============================================
; Title:  admin.component.ts
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Admin Component
;===========================================
*/
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.component.html', 
  styleUrls: ['admin.component.scss'],
    // router outlet for the admin module
    template: `
    <router-outlet></router-outlet>
    `,
    styles: [
    ]
})
export class AdminComponent {

}
