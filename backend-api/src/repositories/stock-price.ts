import { Service } from 'typedi';

import { BaseRepository, StockPriceModel } from '@src/shared/interfaces';
import StockPrice from '@src/models/stock-price';
import NotFoundError from '@src/shared/errors/not-found';

@Service()
export class StockPriceRepository implements BaseRepository<StockPriceModel> {
  async create(item: StockPriceModel): Promise<boolean> {
    try {
      const stockPrice = new StockPrice(item);
      await stockPrice.save();

      return true;
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, item: StockPriceModel): Promise<boolean> {
    try {
      const stockPrice = await StockPrice.findByPk(id);

      if (stockPrice) {
        stockPrice.companyName = item.companyName;
        stockPrice.currentPrice = item.currentPrice;
        stockPrice.changePercent = item.changePercent;

        await stockPrice.save();

        return true;
      } else {
        throw new NotFoundError(`Stock price #${id} not found.`);
      }
    } catch (err) {
      throw err;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const stockPrice = await StockPrice.findByPk(id);

      if (stockPrice) {
        await stockPrice.destroy();

        return true;
      } else {
        throw new NotFoundError(`Stock price #${id} not found.`);
      }
    } catch (err) {
      throw err;
    }
  }

  getAll() {
    console.log('Getting all the stocks');
  }
}
