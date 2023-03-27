import { Service } from 'typedi';

import StockPrice from '@src/models/stock-price';
import NotFoundError from '@src/shared/errors/not-found';
import { BaseRepository, Paginate, StockPriceModel } from '@src/shared/interfaces';

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

  public async getAll({
    page,
    pageSize,
    col,
    order,
  }: Paginate): Promise<{ results: StockPriceModel[]; total: number }> {
    try {
      const offset = Number(page) * Number(pageSize);
      const limit = Number(pageSize);

      col = col ? col : 'createdAt';
      order = order ? order : 'ASC';

      const { count, rows } = await StockPrice.findAndCountAll({
        offset,
        limit,
        order: [[col, order]],
      });

      return { results: rows, total: count };
    } catch (err) {
      throw err;
    }
  }
}
