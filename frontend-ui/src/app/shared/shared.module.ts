import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CardModule } from 'primeng/card';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, CardModule],
  exports: [CommonModule, ReactiveFormsModule, CardModule],
})
export class SharedModule {}
