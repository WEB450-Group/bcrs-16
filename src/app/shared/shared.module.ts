import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { NavComponent } from './layouts/nav/nav.component';
import { FooterComponent } from './layouts/footer/footer.component';



@NgModule({
  declarations: [NavComponent, FooterComponent, BaseLayoutComponent],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule
  ],
  exports: [NavComponent, FooterComponent, BaseLayoutComponent]
})
export class SharedModule { }
