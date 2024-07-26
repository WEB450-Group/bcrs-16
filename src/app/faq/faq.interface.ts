/*
============================================
; Title:  faq.interface.ts
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: FAQ Interface
;===========================================
*/
export interface Faq {
  question: string;
  answer: string;
  isAdmin?: boolean; // Optional
}