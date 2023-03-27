import { Service, Inject } from 'typedi';
import { Request, Response, NextFunction } from 'express';

import Autobind from '@src/shared/decorators/autobind';
import StockPriceService from '@src/services/stock-price';
import { HttpStatusCodes } from '@src/shared/enums/http-status';
import { Paginate, PaginatedResponse, StockPriceModel } from '@src/shared/interfaces';

@Service()
export default class StockPricesController {
  @Inject()
  public stockPriceService: StockPriceService;

  @Autobind
  public async getStockPrices(
    req: Request<unknown, unknown, unknown, Paginate>,
    res: Response<PaginatedResponse<StockPriceModel>>,
    next: NextFunction,
  ): Promise<void> {
    try {
      const params = req.query;

      const stockPricesResponse = await this.stockPriceService.getStockPrices(params);

      res.status(HttpStatusCodes.OK).json(stockPricesResponse);
    } catch (err) {
      next(err);
    }
  }
}
