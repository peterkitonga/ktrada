import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PaginatedResponse, StockPrice } from '@src/app/shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class StockPriceService {
  constructor(private http: HttpClient) {}

  getStockPrices(params: Record<string, string>): Observable<PaginatedResponse<StockPrice>> {
    let httpParams = new HttpParams();

    for (let key in params) {
      httpParams = httpParams.set(key, params[key]);
    }

    return this.http.get<PaginatedResponse<StockPrice>>('$BASE_URL/stocks', {
      reportProgress: true,
      params: httpParams,
    });
  }
}
