import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';

import { Table } from 'primeng/table';
import { MenuItem, SortEvent } from 'primeng/api';

import { Security, StockPrice } from '@src/app/shared/interfaces';
import { StockPriceService } from '@src/app/shared/services/stock-price.service';
import { HttpProgressService } from '@src/app/shared/services/http-progress.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  @ViewChild(Table, { static: true })
  dataTable!: Table;

  _withinOnChanges = false;

  tableData!: StockPrice[];

  cols!: { field: string; header: string }[];
  menuItems!: { label: string; items: MenuItem[] }[];

  first: number = 0;
  rows: number = 5;
  total: number = 0;

  isLoading: boolean = false;

  isVisibleDialog!: boolean;

  securities!: Security[];

  formGroup!: FormGroup;

  filteredSecurities!: Security[];

  constructor(private stockPriceService: StockPriceService, private httpProgressService: HttpProgressService) {}

  ngOnInit(): void {
    this.getStockPrices();

    this.httpProgressService.progressCheck.subscribe((value) => {
      this.isLoading = value;
    });

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
              this.getStockPrices();
            },
          },
          {
            label: 'Add to List',
            icon: 'bi bi-plus-lg',
            command: () => {
              this.showDialog();
            },
          },
        ],
      },
    ];

    const sortSingleDelegate = this.dataTable.sortSingle;
    this.dataTable.sortSingle = () => {
      if (!this._withinOnChanges) {
        sortSingleDelegate.call(this.dataTable);
      }
    };

    const ngOnChangesDelegate = this.dataTable.ngOnChanges;
    this.dataTable.ngOnChanges = (changes: SimpleChanges) => {
      this._withinOnChanges = true;
      try {
        ngOnChangesDelegate.call(this.dataTable, changes);
      } finally {
        this._withinOnChanges = false;
      }
    };

    this.formGroup = new FormGroup({
      selected: new FormControl<Security | null>(null),
    });
  }

  onPageChange(event: { first: number; rows: number }) {
    this.first = event.first;
    this.rows = event.rows;

    this.getStockPrices();
  }

  getStockPrices(): void {
    this.stockPriceService.getStockPrices({ page: String(this.first + 1), pageSize: String(this.rows) }).subscribe({
      next: (response) => {
        this.tableData = response.data!;
        this.total = response.total!;
      },
    });
  }

  customSort(event: SortEvent): void {
    if (!this._withinOnChanges) {
      const { field, order } = event;

      this.stockPriceService
        .getStockPrices({
          page: String(this.first + 1),
          pageSize: String(this.rows),
          col: field!,
          order: order! === 1 ? 'ASC' : 'DESC',
        })
        .subscribe({
          next: (response) => {
            this.tableData = response.data!;
            this.total = response.total!;
          },
        });
    }
  }

  showDialog(): void {
    this.isVisibleDialog = true;
  }

  filterSecurities(event: { query: string }) {
    let filtered: Security[] = [];
    let query = event.query;

    if (query.length >= 3) {
      this.stockPriceService.getSecurities(query).subscribe({
        next: (response) => {
          for (let i = 0; i < response.data.length; i++) {
            let security = response.data[i];
            if (security.longname.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filtered.push(security);
            }
          }

          this.filteredSecurities = filtered;
        },
      });
    }
  }

  addToList(): void {
    if (this.formGroup.valid) {
      this.stockPriceService.createStockPrice(this.formGroup.value.selected.symbol).subscribe({
        next: () => {
          this.isVisibleDialog = false;
          this.getStockPrices();
        },
      });
    }
  }
}
