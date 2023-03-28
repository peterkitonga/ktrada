import { Service, Inject } from 'typedi';
import { Request, Response, NextFunction } from 'express';

import Autobind from '@src/shared/decorators/autobind';
import StockPriceService from '@src/services/stock-price';
import { HttpStatusCodes } from '@src/shared/enums/http-status';
import { AppResponse, Paginate, PaginatedResponse, Security, StockPriceModel } from '@src/shared/interfaces';

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

  @Autobind
  public async getSecurities(
    req: Request<unknown, unknown, unknown, { q: string }>,
    res: Response<AppResponse<Security[]>>,
    next: NextFunction,
  ): Promise<void> {
    try {
      const params = req.query;

      const securitiesResponse = await this.stockPriceService.getSecuritiesByQuery(params.q);

      res.status(HttpStatusCodes.OK).json(securitiesResponse);
    } catch (err) {
      next(err);
    }
  }

  @Autobind
  public async createStockPrice(
    req: Request<unknown, unknown, { symbol: string }>,
    res: Response<AppResponse<null>>,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request = req.body;

      await this.stockPriceService.createStockPrice(request.symbol);

      res.status(HttpStatusCodes.CREATED).json({ message: 'created' });
    } catch (err) {
      next(err);
    }
  }
}
