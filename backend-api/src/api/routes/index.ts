import { Router } from 'express';

import stockPrice from '@src/api/routes/stock-price';

const router = Router();

export default (): Router => {
  stockPrice(router);

  return router;
};
