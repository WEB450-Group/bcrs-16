/*
============================================
; Title:  service-graph.component.ts
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Service Graph Component
;===========================================
*/
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-service-graph',
  templateUrl: './service-graph.component.html',
  styleUrls: ['./service-graph.component.scss']
})
export class ServiceGraphComponent {
  // local variables
  pieChartCheck: boolean = false;
  stackedChartCheck: boolean = true;

  constructor(private route: ActivatedRoute,) {

  }


  changeChartView() {
    this.pieChartCheck = !this.pieChartCheck;
    this.stackedChartCheck = !this.stackedChartCheck;
  }
}
