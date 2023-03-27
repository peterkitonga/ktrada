import { Router } from 'express';
import { Container } from 'typedi';

import StockPricesController from '@src/api/controllers/stock-price';

const router = Router();
const stockPricesController = Container.get(StockPricesController);

export default (appRouter: Router): void => {
  appRouter.use('/stocks', router);

  router.get('/securities', stockPricesController.getSecurities);
  router.get('/', stockPricesController.getStockPrices);
};
