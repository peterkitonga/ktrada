import { Service, Inject } from 'typedi';

import { StockPriceRepository } from '@src/repositories/stock-price';

@Service()
export class StockPriceService {
  @Inject()
  stockPriceRepository: StockPriceRepository;

  getStockData = () => {
    this.stockPriceRepository.getAll();
  };
}
