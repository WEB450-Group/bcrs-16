/*
============================================
; Title:  password-reset.component.ts
; Author: Professor Krasso
; Date: 7. July, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Reset password Component
;===========================================
*/
import { Component } from '@angular/core';
import { SecurityService } from '../security.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent {

}
