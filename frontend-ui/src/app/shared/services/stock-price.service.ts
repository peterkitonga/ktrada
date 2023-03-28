import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiResponse, PaginatedResponse, Security, StockPrice } from '@src/app/shared/interfaces';

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

  getSecurities(query: string): Observable<ApiResponse<Security[]>> {
    let httpParams = new HttpParams();

    httpParams = httpParams.set('q', query);

    return this.http.get<ApiResponse<Security[]>>('$BASE_URL/stocks/securities', {
      reportProgress: true,
      params: httpParams,
    });
  }

  createStockPrice(symbol: string): Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(
      '$BASE_URL/stocks',
      {
        symbol,
      },
      {
        reportProgress: true,
      },
    );
  }
}
