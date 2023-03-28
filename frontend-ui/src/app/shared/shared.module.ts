import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    TableModule,
    PaginatorModule,
    ToastModule,
    ProgressBarModule,
    AutoCompleteModule,
    ButtonModule,
    MenuModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    TableModule,
    PaginatorModule,
    ToastModule,
    ProgressBarModule,
    AutoCompleteModule,
    ButtonModule,
    MenuModule,
  ],
})
export class SharedModule {}
