import { Service } from 'typedi';

import { BaseRepository, StockPriceModel } from '@src/shared/interfaces';
import StockPrice from '@src/models/stock-price';
import NotFoundError from '@src/shared/errors/not-found';

@Service()
export default class StockPriceRepository implements BaseRepository<StockPriceModel> {
  public async create(item: StockPriceModel): Promise<boolean> {
    try {
      const stockPrice = new StockPrice(item);
      await stockPrice.save();

      return true;
    } catch (err) {
      throw err;
    }
  }

  public async update(symbol: string, item: StockPriceModel): Promise<boolean> {
    try {
      const stockPrice = await StockPrice.findOne({ where: { tickerSymbol: symbol } });

      if (stockPrice) {
        stockPrice.companyName = item.companyName;
        stockPrice.currentPrice = item.currentPrice;
        stockPrice.changePercent = item.changePercent;

        await stockPrice.save();

        return true;
      } else {
        throw new NotFoundError(`Stock price for ${symbol} not found.`);
      }
    } catch (err) {
      throw err;
    }
  }

  public async delete(symbol: string): Promise<boolean> {
    try {
      const stockPrice = await StockPrice.findOne({ where: { tickerSymbol: symbol } });

      if (stockPrice) {
        await stockPrice.destroy();

        return true;
      } else {
        throw new NotFoundError(`Stock price for ${symbol} not found.`);
      }
    } catch (err) {
      throw err;
    }
  }

  public getAll() {
    console.log('Getting all the stocks');
  }
}
