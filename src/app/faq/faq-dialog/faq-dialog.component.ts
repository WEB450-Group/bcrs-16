/*
============================================
; Title:  faq-dialog.component.ts
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: FAQ Dialog Component
;===========================================
*/
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-faq-dialog',
  templateUrl: './faq-dialog.component.html',
  styleUrls: ['./faq-dialog.component.scss']
})
export class FaqDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { question: string; answer: string }) {}
}
