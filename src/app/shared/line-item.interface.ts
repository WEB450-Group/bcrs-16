/*
============================================
; Title: invoice.interface.ts
; Author: Professor Krasso
; Date: 18. July, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Invoice interface
;===========================================
*/

export interface LineItem {
  itemId: number;
  itemName: string;
  price: number;
  checked: boolean;
}