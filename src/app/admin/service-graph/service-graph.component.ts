/*
============================================
; Title:  service-graph.component.ts
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Service Graph Component
;===========================================
*/
import { Component, OnInit, OnChanges, SimpleChanges, AfterViewInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { InvoiceService } from 'src/app/shared/invoice.service';
import { Chart, registerables, ChartConfiguration } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-service-graph',
  templateUrl: './service-graph.component.html',
  styleUrls: ['./service-graph.component.scss']
})
export class ServiceGraphComponent implements OnInit, OnChanges, AfterViewInit {
  // local variables
  pieChartCheck: boolean = true;
  barChartCheck: boolean = false;
  pieChart: Chart<'pie', number[], string> | null = null;
  barChart: Chart<'bar', { x: string; y: number }[]> | null = null;

  servicesData: any[] = [];

  // ViewChild decorator to reference the canvas element in the html
  @ViewChild('myPieChart') myPieChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('myStackedChart') myBarChart!: ElementRef<HTMLCanvasElement>;

  constructor(private cdr: ChangeDetectorRef, private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    // Get the services data
    this.invoiceService.findAllServiceRequests().subscribe({
      next: (data: any) => {
        this.servicesData = data;
        this.cdr.detectChanges();
        if (this.pieChartCheck) {
          this.renderPieChart();
        } else if (this.barChartCheck) {
          this.renderStackedChart();
        }
      },
      error: (err) => {
        console.error('Error getting the data: ', err);
      }
    })
  }

  ngAfterViewInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    // Check if the pieChartCheck has changed and is now true to re-render the pie chart
    if (changes['pieChartCheck'] && this.pieChartCheck) {
      this.cdr.detectChanges();
      this.renderPieChart();
    }
  }

  renderPieChart(): void {
    // Get the pie chart canvas element
    const ctx = this.myPieChart.nativeElement;

    // Destroy existing chart instance if it exists to prevent duplicates
    if (this.pieChart) {
      this.pieChart.destroy();
    }

    // Map the serviceData retrieved to the labels and data of the pie chart
    const labels = this.servicesData.map(item => item._id.title);
    const data = this.servicesData.map(item => item.itemCount);

    // Pie Chart Configuration
    const config: ChartConfiguration<'pie', number[], string> = {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            '#F8A1A1',
            '#FFB77D',
            '#9BDC9F',
            '#8AB8FF',
            '#8E6FD1',
            '#D9A96A',
            '#8CE1F0'
          ],
          hoverBackgroundColor: [
            '#ED0A3F',
            '#FF8833',
            '#5FA777',
            '#0066CC',
            '#6B3FA0',
            '#AF593E',
            '#6CDAE7'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
    // Create the new Chart
    this.pieChart = new Chart<'pie', number[], string>(ctx, config);
  }

  renderStackedChart() {
    // Get the stacked chart canvas element
    const ctx = this.myBarChart.nativeElement;

    // Destroy existing chart instance if it exists to prevent duplicates
    if(this.barChart) {
      this.barChart.destroy();
    }

    // Map the serviceData retrieved to the labels and data of the pie chart
    const labels = this.servicesData.map(item => item._id.title);
    const data = this.servicesData.map(item => ({ x: item._id.title, y: item.itemCount }));

    // Bar Chart Configuration
    const config: ChartConfiguration<'bar', { x: string; y: number }[], string> = {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Service Counts',
          data: data,
          backgroundColor: '#22AF31',
          hoverBackgroundColor: '#224D31',
          barPercentage: 0.5,
          categoryPercentage: 0.5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true
          }
        }
      }
    };
    // Create the new Chart
    this.barChart = new Chart<'bar', { x: string; y: number }[]>(ctx, config);
  }

  changeChartView(): void {
    // Change the booleans value to the opposite
    this.pieChartCheck = !this.pieChartCheck;
    this.barChartCheck = !this.barChartCheck;

    // If the pieChartCheck is true; then detect changes in the DOM and render the pie chart
    if (this.pieChartCheck) {
      this.cdr.detectChanges();
      this.renderPieChart();

      // Else if the barChartCheck is true; then detect changes in the DOM and render the bar chart
    } else if (this.barChartCheck) {
      this.cdr.detectChanges();
      this.renderStackedChart();
    } else {
      // If there is already a pie chart that exist; then destroy it
      if (this.pieChart) {
        this.pieChart.destroy();
        this.pieChart = null;
      }
      // If there is already a bar chart that exist; then destroy it
      if (this.barChart) {
        this.barChart.destroy();
        this.barChart = null;
      }
    }
  }
}

