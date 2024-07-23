/*
============================================
; Title:  service-graph.component.ts
; Author: Professor Krasso
; Date: 29. June, 2024
; Modified by: Joanna Brumfield and Zadkiel Rodriguez Alvarado
; Description: Service Graph Component
;===========================================
*/
import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/shared/invoice.service';

@Component({
  selector: 'app-service-graph',
  templateUrl: './service-graph.component.html',
  styleUrls: ['./service-graph.component.scss']
})
export class ServiceGraphComponent implements OnInit {
  // Chart variables
  pieChartCheck: boolean = true;
  barChartCheck: boolean = false;
  pieChartData: any;
  barChartData: any;

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    // Get all the services
    this.invoiceService.findAllServiceRequests().subscribe({
      next: (data: any) => {
        // Process the data received
        this.processChartData(data);
      },
      error: (err) => {
        // Console error if there was an error fetching the data
        console.error('Error getting the data: ', err);
      }
    });
  }

  processChartData(data: any): void {
    // Map the labels from the item title
    const labels = data.map((item: any) => item._id.title);
    // Map the count of services from the item counts
    const itemCount = data.map((item: any) => item.itemCount);

    // Construct the pie chart
    this.pieChartData = {
      labels: labels,
      datasets: [
        {
          data: itemCount,
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
        }
      ]
    };

    // Construct the bar chart
    this.barChartData = {
      labels: labels,
      datasets: [
        {
          label: 'Service Counts',
          data: itemCount,
          backgroundColor: '#22AF31',
          hoverBackgroundColor: '#224D31'
        }
      ]
    };
  }

  // Function to switch between the pie and bar charts
  changeChartView(): void {
    this.pieChartCheck = !this.pieChartCheck;
    this.barChartCheck = !this.barChartCheck;
  }
}


