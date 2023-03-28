import { TestBed } from '@angular/core/testing';

import { StockPriceService } from './stock-price.service';

describe('StockPriceService', () => {
  let service: StockPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
