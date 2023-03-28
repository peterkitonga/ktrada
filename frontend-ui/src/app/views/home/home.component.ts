import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { StockPrice } from '@src/app/shared/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  tableData!: StockPrice[];

  cols!: { field: string; header: string }[];
  menuItems!: { label: string; items: MenuItem[] }[];

  first: number = 0;

  rows: number = 10;

  constructor() {}

  ngOnInit(): void {
    this.tableData = [
      {
        id: 1,
        companyName: 'Alphabet Inc.',
        tickerSymbol: 'GOOG',
        currentPrice: 222.22,
        changePercent: 1.38,
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
      },
    ];
    this.cols = [
      { field: 'companyName', header: 'Company Name' },
      { field: 'tickerSymbol', header: 'Ticker Symbol' },
      { field: 'currentPrice', header: 'Current Price' },
      { field: 'changePercent', header: 'Change (in Percentage)' },
      { field: '_', header: 'Actions' },
    ];
    this.menuItems = [
      {
        label: 'Actions',
        items: [
          {
            label: 'Refresh Prices',
            icon: 'bi bi-arrow-clockwise',
            command: () => {
              //
            },
          },
          {
            label: 'Add to List',
            icon: 'bi bi-plus-lg',
            command: () => {
              //
            },
          },
        ],
      },
    ];
  }

  onPageChange(event: { first: number; rows: number }) {
    this.first = event.first;
    this.rows = event.rows;
  }
}
